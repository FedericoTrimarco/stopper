// club-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LegaService } from '../lega.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

// Interface per il nuovo formato dei dati
interface SquadPlayer {
  id: string;
  name: string;
  image: string;
  shirtNumber: string;
  age: number;
  height: string;
  foot: string;
  positions: {
    first: {
      id: string;
      name: string;
      shortName: string;
      group: string;
    };
    second?: {
      id: string;
      name: string;
      shortName: string;
      group: string;
    };
    third?: {
      id: string;
      name: string;
      shortName: string;
      group: string;
    };
  };
  nationalities: Array<{
    id: number;
    name: string;
    image: string;
  }>;
  marketValue: {
    value: number;
    currency: string;
  };
  isGoalkeeper: boolean;
  captain: boolean;
  isLoan: boolean;
}

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
  players: SquadPlayer[] = [];
  
  // Stati di caricamento
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';
  
  // Filtri per i giocatori
  selectedPosition: string = 'all';
  searchTerm: string = '';
  
  // Posizioni disponibili (aggiornate per il nuovo formato)
  positions = [
    { value: 'all', label: 'Tutte le posizioni' },
    { value: 'Torwart', label: 'Portiere' },
    { value: 'Abwehr', label: 'Difensore' },
    { value: 'Mittelfeld', label: 'Centrocampista' },
    { value: 'Sturm', label: 'Attaccante' }
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

    const storedPlayers = localStorage.getItem(`playersSquad${this.clubId}`);
    
    if(storedPlayers != null){
      this.isLoading = false;
      this.hasError = false;
      
      this.players = JSON.parse(storedPlayers);

      const storedClubInfo = localStorage.getItem(`clubInfo${this.clubId}`);

      if(storedClubInfo != null){
        this.clubInfo = storedClubInfo;
      }
    } else {

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
        if (response?.data?.squad) {
          // Processa i dati del club se disponibili
          this.clubInfo = response.data.club || { 
            name: 'Squadra', 
            image: 'assets/images/default-club-logo.png' 
          };
          this.players = response.data.squad;
  
          localStorage.setItem(`playersSquad${this.clubId}`, JSON.stringify(this.players));
          localStorage.setItem(`clubInfo${this.clubId}`, JSON.stringify(this.clubInfo));
          
        } else if (!this.hasError) {
          this.players = [];
          localStorage.removeItem(`playersSquad${this.clubId}`);
          localStorage.removeItem(`clubInfo${this.clubId}`);
        }
      });
    }
  }

  get filteredPlayers(): SquadPlayer[] {
    let filtered = this.players;
    
    // Filtro per posizione
    if (this.selectedPosition !== 'all') {
      filtered = filtered.filter(player => {
        if (!player.positions?.first) return false;
        
        // Per i portieri, verifica anche il flag isGoalkeeper
        if (this.selectedPosition === 'Torwart') {
          return player.isGoalkeeper || player.positions.first.group === 'Torwart';
        }
        
        return player.positions.first.group === this.selectedPosition ||
               player.positions.second?.group === this.selectedPosition ||
               player.positions.third?.group === this.selectedPosition;
      });
    }
    
    // Filtro per ricerca
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(player => {
        // Ricerca nel nome del giocatore
        const nameMatch = player.name?.toLowerCase().includes(term);
        
        // Ricerca nelle nazionalità
        const nationalityMatch = player.nationalities?.some(nat => 
          nat.name?.toLowerCase().includes(term)
        );
        
        // Ricerca nel numero di maglia
        const shirtNumberMatch = player.shirtNumber?.toString().includes(term);
        
        // Ricerca nelle posizioni
        const positionMatch = player.positions?.first?.name?.toLowerCase().includes(term) ||
                             player.positions?.first?.shortName?.toLowerCase().includes(term) ||
                             player.positions?.second?.name?.toLowerCase().includes(term) ||
                             player.positions?.third?.name?.toLowerCase().includes(term);
        
        return nameMatch || nationalityMatch || shirtNumberMatch || positionMatch;
      });
    }
    
    return filtered;
  }

  get playersByPosition(): { [key: string]: SquadPlayer[] } {
    const grouped: { [key: string]: SquadPlayer[] } = {};
    
    this.filteredPlayers.forEach(player => {
      let positionGroup = 'Sconosciuto';
      
      // Determina il gruppo di posizione principale
      if (player.isGoalkeeper) {
        positionGroup = 'Torwart';
      } else if (player.positions?.first?.group) {
        positionGroup = player.positions.first.group;
      }
      
      if (!grouped[positionGroup]) {
        grouped[positionGroup] = [];
      }
      grouped[positionGroup].push(player);
    });
    
    // Ordina i giocatori per numero di maglia all'interno di ogni posizione
    Object.keys(grouped).forEach(position => {
      grouped[position].sort((a, b) => {
        const numA = parseInt(a.shirtNumber) || 999;
        const numB = parseInt(b.shirtNumber) || 999;
        return numA - numB;
      });
    });
    
    return grouped;
  }

  onBackClick(): void {
    this.router.navigate(['/serie-d']);
  }

  onPlayerClick(player: SquadPlayer): void {
    this.router.navigate(['resume/player-detail', player.id]);
  }

  onImageError(event: any): void {
    event.target.src = 'https://img.a.transfermarkt.technology/portrait/medium/default.jpg?lm=1';
  }

  trackByPlayer(index: number, player: SquadPlayer): string {
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

  // Helper per tradurre i gruppi di posizione
  getPositionGroupLabel(group: string): string {
    const translations: { [key: string]: string } = {
      'Torwart': 'Portieri',
      'Abwehr': 'Difensori', 
      'Mittelfeld': 'Centrocampisti',
      'Sturm': 'Attaccanti',
      'Sconosciuto': 'Altri'
    };
    return translations[group] || group;
  }

  // Helper per ordinare le posizioni
  getPositionOrder(): string[] {
    return ['Torwart', 'Abwehr', 'Mittelfeld', 'Sturm', 'Sconosciuto'];
  }

  // Getter per le posizioni ordinate
  get orderedPositions(): string[] {
    const availablePositions = Object.keys(this.playersByPosition);
    const positionOrder = this.getPositionOrder();
    
    return positionOrder.filter(position => availablePositions.includes(position));
  }

  // Helper per verificare se un giocatore è capitano
  isCaptain(player: SquadPlayer): boolean {
    return player.captain === true;
  }

  // Helper per verificare se un giocatore è in prestito
  isOnLoan(player: SquadPlayer): boolean {
    return player.isLoan === true;
  }
}