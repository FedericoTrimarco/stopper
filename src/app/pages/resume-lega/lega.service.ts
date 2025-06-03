import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces per il service
export interface Club {
  id: string;
  name: string;
  image: string;
}

export interface ApiResponse {
  data: {
    clubs: Club[];
  };
}

export interface NewsItem {
  title: string;
  source: string;
  date: string;
  image: string;
}

export interface Player {
  id: string;
  name: string;
  image: string;
  imageLarge?: string;
  imageSource?: string;
  shirtNumber?: string;
  age: number;
  dateOfBirth: number;
  heroImage?: string;
  isGoalkeeper?: boolean;
  height?: string;
  foot?: string;
  injury?: any;
  suspension?: any;
  joined?: number;
  contractUntil?: number;
  captain?: boolean;
  lastClub?: any;
  isLoan?: any;
  wasLoan?: any;
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
  marketValue?: {
    value: number;
    currency: string;
    progression?: any;
  };
}

export interface SquadApiResponse {
  data: {
    squad: Player[];
    club: {
      id: string;
      name: string;
      image: string;
      founded: number;
      stadium: string;
      capacity: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class LegaService {
  
  /* private readonly API_KEY = '94ed4b0529mshcb3677c819fbd4ap1259dajsn912a528b1ed0';
  private readonly API_HOST = 'transfermarkt6.p.rapidapi.com';
  private readonly BASE_URL = 'https://transfermarkt6.p.rapidapi.com'; */

  
  private readonly API_KEY = 'f7c9b48453msh0127799b22c7f5ep1f89b5jsn2b228e8ae60f';
  private readonly API_HOST = 'transfermarkt6.p.rapidapi.com';
  private readonly BASE_URL = 'https://transfermarkt6.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-rapidapi-key': this.API_KEY,
      'x-rapidapi-host': this.API_HOST
    });
  }

  /**
   * Carica le news della Serie A
   */
  loadNewsLega(): Observable<any> {
    const url = `${this.BASE_URL}/competitions/news`;
    const params = new HttpParams()
      .set('id', 'it4A')
      .set('domain', 'it');

    return this.http.get(url, {
      headers: this.getHeaders(),
      params: params
    });
  }

  /**
   * Carica i club di un singolo girone
   * @param gironeId - ID del girone (es: 'it4a', 'it4b', etc.)
   */
  loadGironeClubs(gironeId: string): Observable<ApiResponse> {
    const url = `${this.BASE_URL}/competitions/clubs`;
    const params = new HttpParams()
      .set('id', gironeId)
      .set('domain', 'it');

    return this.http.get<ApiResponse>(url, {
      headers: this.getHeaders(),
      params: params
    });
  }

  /**
   * Carica la rosa di una squadra
   * @param clubId - ID della squadra
   * @param seasonId - ID della stagione (default: 2024)
   */
  loadClubSquad(clubId: string, seasonId: string = '2024'): Observable<SquadApiResponse> {
    const url = `${this.BASE_URL}/clubs/squad`;
    const params = new HttpParams()
      .set('id', clubId)
      .set('seasonId', seasonId);

    return this.http.get<SquadApiResponse>(url, {
      headers: this.getHeaders(),
      params: params
    });
  }

  /**
   * Carica le statistiche di una squadra
   * @param clubId - ID della squadra
   * @param seasonId - ID della stagione
   */
  loadClubStats(clubId: string, seasonId: string = '2024'): Observable<any> {
    const url = `${this.BASE_URL}/clubs/stats`;
    const params = new HttpParams()
      .set('id', clubId)
      .set('seasonId', seasonId);

    return this.http.get(url, {
      headers: this.getHeaders(),
      params: params
    });
  }

  /**
   * Carica i risultati di una squadra
   * @param clubId - ID della squadra
   * @param seasonId - ID della stagione
   */
  loadClubResults(clubId: string, seasonId: string = '2024'): Observable<any> {
    const url = `${this.BASE_URL}/clubs/results`;
    const params = new HttpParams()
      .set('id', clubId)
      .set('seasonId', seasonId);

    return this.http.get(url, {
      headers: this.getHeaders(),
      params: params
    });
  }

  /**
   * Carica il dettaglio profilo di un giocatore
   * @param playerId - ID del giocatore
   */

  loadPlayerProfile(playerId: number):Promise<any>{
    const params = new HttpParams()
    .set('id', playerId)
    .set('domain', 'it');
    
    const body = {
      headers: this.getHeaders(),
      params: params
    }
    
    return this.http.get(`${this.BASE_URL}/players/profile`, body ).toPromise().then(
      res => res).catch((err) => console.error(err));
      
  }

  /**
   * Utility per generare l'ID del girone
   * @param letter - Lettera del girone (A, B, C, etc.)
   */
  generateGironeId(letter: string): string {
    return `it4${letter.toLowerCase()}`;
  }

  /**
   * Utility per ottenere il nome completo del girone
   * @param letter - Lettera del girone
   */
  getGironeName(letter: string): string {
    return `Serie D - Girone ${letter.toUpperCase()}`;
  }
}