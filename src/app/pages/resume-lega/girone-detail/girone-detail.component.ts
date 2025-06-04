import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LegaService, Club, ApiResponse } from '../lega.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-girone-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './girone-detail.component.html',
  styleUrls: ['./girone-detail.component.scss']
})
export class GironeDetailComponent implements OnInit {
  gironeId: string = '';
  gironeLetter: string = '';
  gironeName: string = '';
  clubs: Club[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private legaService: LegaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gironeLetter = params['letter']?.toUpperCase() || '';
      this.gironeId = this.legaService.generateGironeId(this.gironeLetter);
      this.gironeName = this.legaService.getGironeName(this.gironeLetter);
      this.loadGironeData();
    });
  }

  loadGironeData(): void {

    const storedClubs = localStorage.getItem(`clubsGironeDetail${this.gironeLetter}`);
    
    if(storedClubs != null){
      this.isLoading = false;
      this.hasError = false;
      console.log(this.gironeLetter);
      
      this.clubs = JSON.parse(storedClubs);
    } else {
      this.isLoading = true;
      this.hasError = false;
      
      this.legaService.loadGironeClubs(this.gironeId).pipe(
        catchError(error => {
          console.error('Errore nel caricamento del girone:', error);
          this.hasError = true;
          this.errorMessage = 'Errore nel caricamento dei dati del girone';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(response => {
        if (response?.data?.clubs) {
          this.clubs = response.data.clubs;
  
  
        } else if (!this.hasError) {
          this.clubs = [];
        }
  
        localStorage.setItem(`clubsGironeDetail${this.gironeLetter}`, JSON.stringify(this.clubs));
      });
    }

  }

  onClubClick(club: Club): void {
    this.router.navigate(['resume/club-detail', club.id]);
  }

  onBackClick(): void {
    this.router.navigate(['/resume']);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-club-logo.png';
  }

  trackByClub(index: number, club: Club): string {
    return club.id || club.name;
  }

  retryLoad(): void {
    this.loadGironeData();
  }
}