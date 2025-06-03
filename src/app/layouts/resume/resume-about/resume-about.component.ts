import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

interface Club {
  id: string;
  name: string;
  image: string;
}

interface ApiResponse {
  data: {
    clubs: Club[];
  };
}

interface Girone {
  letter: string;
  name: string;
  clubs: Club[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-resume-about',
  imports: [CommonModule],
  templateUrl: './resume-about.component.html',
  styleUrls: ['./resume-about.component.scss']
})
export class ResumeAboutComponent implements OnInit {
  gironi: Girone[] = [];
  isGlobalLoading = true;

  private readonly API_KEY = '94ed4b0529mshcb3677c819fbd4ap1259dajsn912a528b1ed0';
  private readonly API_HOST = 'transfermarkt6.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeGironi();
    this.loadAllGironi();
  }

  private initializeGironi(): void {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    this.gironi = letters.map(letter => ({
      letter,
      name: `Serie D - Girone ${letter}`,
      clubs: [],
      isLoading: true,
      error: null
    }));
  }

  loadAllGironi(): void {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.API_KEY,
      'x-rapidapi-host': this.API_HOST
    });

    // Crea un array di observable per tutti i gironi
    const requests = this.gironi.map(girone => 
      this.http.get<ApiResponse>(
        `https://transfermarkt6.p.rapidapi.com/competitions/clubs?id=it4${girone.letter.toLowerCase()}&domain=it`, 
        { headers }
      ).pipe(
        catchError(err => {
          console.error(`Errore caricamento Girone ${girone.letter}:`, err);
          return of(null);
        })
      )
    );

    // Esegue tutte le richieste in parallelo
    forkJoin(requests).pipe(
      finalize(() => {
        this.isGlobalLoading = false;
      })
    ).subscribe(responses => {
      responses.forEach((response, index) => {
        const girone = this.gironi[index];
        girone.isLoading = false;
        
        if (response?.data?.clubs) {
          girone.clubs = response.data.clubs;
          girone.error = null;
        } else {
          girone.error = 'Errore nel caricamento';
          girone.clubs = [];
        }
      });
    });
  }

  retryLoadGirone(gironeIndex: number): void {
    const girone = this.gironi[gironeIndex];
    girone.isLoading = true;
    girone.error = null;

    const headers = new HttpHeaders({
      'x-rapidapi-key': this.API_KEY,
      'x-rapidapi-host': this.API_HOST
    });

    this.http.get<ApiResponse>(
      `https://transfermarkt6.p.rapidapi.com/competitions/clubs?id=it4${girone.letter.toLowerCase()}&domain=it`, 
      { headers }
    ).pipe(
      catchError(err => {
        console.error(`Errore retry Girone ${girone.letter}:`, err);
        girone.error = 'Errore nel caricamento';
        return of(null);
      }),
      finalize(() => {
        girone.isLoading = false;
      })
    ).subscribe(response => {
      if (response?.data?.clubs) {
        girone.clubs = response.data.clubs;
        girone.error = null;
      }
    });
  }

  trackByGirone(index: number, girone: Girone): string {
    return girone.letter;
  }

  trackByClub(index: number, club: Club): string {
    return club.id || club.name;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-club-logo.png';
  }

  // Getter per le statistiche (per evitare arrow functions nel template)
  get totalSquadre(): number {
    return this.gironi.reduce((total, g) => total + g.clubs.length, 0);
  }

  get gironiCaricati(): number {
    return this.gironi.filter(g => g.clubs.length > 0).length;
  }
}