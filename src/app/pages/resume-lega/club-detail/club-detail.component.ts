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
      filtered = filtered.filter(player => player.positions?.first?.name === this.selectedPosition);
    }

    // Filtro per ricerca
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(term) ||
        (player.nationalities && player.nationalities.some(n => n.name.toLowerCase().includes(term)))
      );
    }

    return filtered;
  }

  get playersByPosition(): { [key: string]: Player[] } {
    const grouped: { [key: string]: Player[] } = {};

    this.filteredPlayers.forEach(player => {
      const position = player.positions?.first?.name || 'Unknown';
      if (!grouped[position]) {
        grouped[position] = [];
      }
      grouped[position].push(player);
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

export interface Player {
  id: string;
  name: string;
  position?: string;
  age: number;
  nationality?: string;
  marketValue: {
    value: number;
    currency: string;
    progression: any;
  };
  image: string;
  shirtNumber?: string;
  height?: string;
  foot?: string;
  isGoalkeeper?: boolean;
  captain?: boolean;
  positions?: {
    first?: {
      id: string;
      name: string;
      shortName: string;
      group: string;
    };
    second?: any;
    third?: any;
  };
  nationalities?: Array<{
    id: number;
    name: string;
    image: string;
  }>;
}