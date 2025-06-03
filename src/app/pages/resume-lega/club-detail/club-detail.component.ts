// club-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LegaService, Player, SquadApiResponse } from '../lega.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-club-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent implements OnInit {
  clubId: string = '';
  seasonId: string = '2024';
  Object = Object;
  
  // Dati del club
  clubInfo: any = null;
  players: Player[] = [];
  
  // Stati di caricamento
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';
  
  // Filtri per i giocatori
  selectedPosition: string = 'all';
  searchTerm: string = '';
  
  // Posizioni disponibili
  positions = [
    { value: 'all', label: 'Tutte le posizioni' },
    { value: 'Goalkeeper', label: 'Portiere' },
    { value: 'Defender', label: 'Difensore' },
    { value: 'Midfielder', label: 'Centrocampista' },
    { value: 'Forward', label: 'Attaccante' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private legaService: LegaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = params['id'];
      this.loadClubData();
    });
  }

  loadClubData(): void {
    this.isLoading = true;
    this.hasError = false;
    
    this.legaService.loadClubSquad(this.clubId, this.seasonId).pipe(
      catchError(error => {
        console.error('Errore nel caricamento della squadra:', error);
        this.hasError = true;
        this.errorMessage = 'Errore nel caricamento dei dati della squadra';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(response => {
      if (response?.data) {
        this.clubInfo = response.data.club;
        this.players = response.data.squad || [];
      } else if (!this.hasError) {
        this.players = [];
      }
    });
  }

  get filteredPlayers(): Player[] {
    let filtered = this.players;
    
    // Filtro per posizione
    if (this.selectedPosition !== 'all') {
      filtered = filtered.filter(player => player.position === this.selectedPosition);
    }
    
    // Filtro per ricerca
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(term) ||
        player.nationality.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }

  get playersByPosition(): { [key: string]: Player[] } {
    const grouped: { [key: string]: Player[] } = {};
    
    this.filteredPlayers.forEach(player => {
      if (!grouped[player.position]) {
        grouped[player.position] = [];
      }
      grouped[player.position].push(player);
    });
    
    return grouped;
  }

  onBackClick(): void {
    this.router.navigate(['/serie-d']);
  }

  onPlayerClick(player: Player): void {
    this.router.navigate(['resume/player-detail', player.id]);
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-player.png';
  }

  trackByPlayer(index: number, player: Player): string {
    return player.id || player.name;
  }

  retryLoad(): void {
    this.loadClubData();
  }

  onPositionChange(event: any): void {
    this.selectedPosition = event.target.value;
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
  }
}