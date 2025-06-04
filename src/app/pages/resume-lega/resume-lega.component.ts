import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LegaService, Club, ApiResponse } from './lega.service';

interface Girone {
  letter: string;
  name: string;
  clubs: Club[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-resume-lega',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './resume-lega.component.html',
  styleUrls: ['./resume-lega.component.scss']
})
export class ResumeLegaComponent implements OnInit {
  // News properties
  newsData: any[] = [];
  isNewsLoading: boolean = false;
  hasNewsError: boolean = false;

  // Gironi properties
  gironi: Girone[] = [];
  isGlobalLoading = true;

  constructor(
    private legaService: LegaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeGironi();
    // this.loadAllGironi();
    // this.loadNews();
  }

  /**
   * Carica le news della lega
   */
  loadNews(): void {
    this.isNewsLoading = true;
    this.hasNewsError = false;
    
    this.legaService.loadNewsLega().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        
        // Adatta questa parte in base alla struttura della risposta API
        if (response && response.data && response.data.news) {
          this.newsData = response.data.news.map((item: any) => ({
            title: item.newsHeadline || item.title,
            source: item.newsSource || 'Transfermarkt',
            date: item.newsDate || item.date,
            image: item.newsFirstImage || item.image,
          }));
        } else {
          this.newsData = response || [];
        }
        
        this.isNewsLoading = false;
        console.log('News processate:', this.newsData);
      },
      error: (error) => {
        console.error('Errore nel caricamento delle news:', error);
        this.hasNewsError = true;
        this.isNewsLoading = false;
      }
    });
  }

  retryLoadNews(): void {
    this.loadNews();
  }

  viewAllNews(event: Event): void {
    event.preventDefault();
    // Implementa la navigazione verso una pagina con tutte le news
    console.log('Navigazione verso tutte le news');
  }

  /**
   * Inizializza la struttura dei gironi
   */
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

  /**
   * Carica tutti i gironi in parallelo
   */
  loadAllGironi(): void {
    // Crea un array di observable per tutti i gironi
    const requests = this.gironi.map(girone =>
      this.legaService.loadGironeClubs(this.legaService.generateGironeId(girone.letter)).pipe(
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

  /**
   * Riprova il caricamento di un singolo girone
   */
  retryLoadGirone(gironeIndex: number): void {
    const girone = this.gironi[gironeIndex];
    girone.isLoading = true;
    girone.error = null;

    this.legaService.loadGironeClubs(
      this.legaService.generateGironeId(girone.letter)
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

  /**
   * Naviga al dettaglio del girone
   */
  onGironeClick(letter: string): void {
    this.router.navigate(['resume/girone-detail', letter.toLowerCase()]);
  }

  /**
   * Naviga al dettaglio della squadra
   */
  onClubClick(club: Club): void {
    this.router.navigate(['resume/club-detail', club.id]);
  }

  /**
   * Gestisce il click sulle statistiche della squadra
   */
  onClubStatsClick(club: Club, event: Event): void {
    event.stopPropagation(); // Previene la navigazione al dettaglio squadra
    // Naviga alle statistiche della squadra
    this.router.navigate(['resume/club-detail', club.id, 'statistiche']);
  }

  /**
   * Gestisce il click sui preferiti della squadra
   */
  onClubFavoriteClick(club: Club, event: Event): void {
    event.stopPropagation(); // Previene la navigazione al dettaglio squadra
    // Implementa la logica per aggiungere/rimuovere dai preferiti
    console.log('Toggle preferito per:', club.name);
    // Qui potresti implementare un servizio per gestire i preferiti
  }

  // Metodi di utility per il template
  trackByGirone(index: number, girone: Girone): string {
    return girone.letter;
  }

  trackByClub(index: number, club: Club): string {
    return club.id || club.name;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-club-logo.png';
  }

  // Getter per le statistiche
  get totalSquadre(): number {
    return this.gironi.reduce((total, g) => total + g.clubs.length, 0);
  }

  get gironiCaricati(): number {
    return this.gironi.filter(g => g.clubs.length > 0).length;
  }
}