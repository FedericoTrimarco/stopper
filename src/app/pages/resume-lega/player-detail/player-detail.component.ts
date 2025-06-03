import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegaService } from '../lega.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  imports: [RouterModule],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss',
  providers: [LegaService]
})
export class PlayerDetailComponent implements OnInit {

  idPlayer: any;
  playerDetail: any;

  // Stati di caricamento
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private legaService: LegaService,
  ) {

  }
  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {

      if(params['id']){
        this.idPlayer = parseInt(params['id']);
        this.loadPlayerProfile();
      }

    });
  }


  onBackClick(): void{
    this.location.back();
  }



  loadPlayerProfile() {

    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = "";

    this.legaService.loadPlayerProfile(this.idPlayer).then(
      res => {
        if(res != null && res.data != null && res.data.playerProfile != null){

          this.playerDetail = res.data.playerProfile;
          this.isLoading = false;
          this.hasError = false;

        } else {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = 'Errore durante la ricerca del giocatore';
        }
      }
    )
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-player.png';
  }

}
```

```html
<!-- player-detail.component.html -->
<div class="player-detail-container">
  <div *ngIf="isLoading" class="loading-spinner">Loading...</div>

  <div *ngIf="hasError" class="error-message">
    {{ errorMessage }}
  </div>

  <div *ngIf="!isLoading && !hasError && playerDetail" class="player-info">
    <div class="player-header">
      <img
        [src]="playerDetail.imageUrl"
        alt="{{ playerDetail.playerName }}"
        (error)="onImageError($event)"
        class="player-image"
      />
      <h1 class="player-name">{{ playerDetail.playerName }}</h1>
    </div>

    <div class="player-stats">
      <div class="stat-item">
        <span class="stat-label">Team:</span>
        <span class="stat-value">{{ playerDetail.teamName }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Position:</span>
        <span class="stat-value">{{ playerDetail.position }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Age:</span>
        <span class="stat-value">{{ playerDetail.age }}</span>
      </div>
      <!-- Add more stats as needed -->
    </div>

    <div class="player-bio">
      <h2 class="bio-title">Biography</h2>
      <p class="bio-content">
        {{ playerDetail.bio }}
      </p>
    </div>
  </div>

  <button (click)="onBackClick()" class="back-button">Back</button>
</div>
```

```scss
/* player-detail.component.scss */
.player-detail-container {
  font-family: 'Arial', sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.loading-spinner,
.error-message {
  text-align: center;
  margin-top: 20px;
  color: #777;
}

.player-info {
  display: flex;
  flex-direction: column;
}

.player-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.player-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
}

.player-name {
  font-size: 2em;
  color: #333;
}

.player-stats {
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  margin-bottom: 8px;
}

.stat-label {
  font-weight: bold;
  margin-right: 5px;
  color: #555;
}

.stat-value {
  color: #666;
}

.player-bio {
  margin-bottom: 20px;
}

.bio-title {
  font-size: 1.5em;
  color: #444;
  margin-bottom: 10px;
}

.bio-content {
  color: #555;
  line-height: 1.6;
}

.back-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.back-button:hover {
  background-color: #0056b3;
}

/* Adapt colors to the resume theme as needed */
```

```json
{
  "data": {
    "playerProfile": {
      "playerId": 123,
      "playerName": "Lionel Messi",
      "imageUrl": "https://example.com/messi.jpg",
      "teamName": "Paris Saint-Germain",
      "position": "Forward",
      "age": 34,
      "bio": "Lionel Messi is an Argentinian professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and captains the Argentina national team."
    }
  }
}
```

```replit_final_file}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LegaService } from '../lega.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  imports: [RouterModule],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss',
  providers: [LegaService]
})
export class PlayerDetailComponent implements OnInit {

  idPlayer: any;
  playerDetail: any;

  // Stati di caricamento
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private legaService: LegaService,
  ) {

  }
  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {

      if(params['id']){
        this.idPlayer = parseInt(params['id']);
        this.loadPlayerProfile();
      }

    });
  }


  onBackClick(): void{
    this.location.back();
  }



  loadPlayerProfile() {

    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = "";

    this.legaService.loadPlayerProfile(this.idPlayer).then(
      res => {
        if(res != null && res.data != null && res.data.playerProfile != null){

          this.playerDetail = res.data.playerProfile;
          this.isLoading = false;
          this.hasError = false;

        } else {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = 'Errore durante la ricerca del giocatore';
        }
      }
    )
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/default-player.png';
  }

}
```<!-- player-detail.component.html -->
<div class="player-detail-container">
  <div *ngIf="isLoading" class="loading-spinner">Loading...</div>

  <div *ngIf="hasError" class="error-message">
    {{ errorMessage }}
  </div>

  <div *ngIf="!isLoading && !hasError && playerDetail" class="player-info">
    <div class="player-header">
      <img
        [src]="playerDetail.imageUrl"
        alt="{{ playerDetail.playerName }}"
        (error)="onImageError($event)"
        class="player-image"
      />
      <h1 class="player-name">{{ playerDetail.playerName }}</h1>
    </div>

    <div class="player-stats">
      <div class="stat-item">
        <span class="stat-label">Team:</span>
        <span class="stat-value">{{ playerDetail.teamName }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Position:</span>
        <span class="stat-value">{{ playerDetail.position }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Age:</span>
        <span class="stat-value">{{ playerDetail.age }}</span>
      </div>
      <!-- Add more stats as needed -->
    </div>

    <div class="player-bio">
      <h2 class="bio-title">Biography</h2>
      <p class="bio-content">
        {{ playerDetail.bio }}
      </p>
    </div>
  </div>

  <button (click)="onBackClick()" class="back-button">Back</button>
</div>
```
```scss
/* player-detail.component.scss */
.player-detail-container {
  font-family: 'Arial', sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.loading-spinner,
.error-message {
  text-align: center;
  margin-top: 20px;
  color: #777;
}

.player-info {
  display: flex;
  flex-direction: column;
}

.player-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.player-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
}

.player-name {
  font-size: 2em;
  color: #333;
}

.player-stats {
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  margin-bottom: 8px;
}

.stat-label {
  font-weight: bold;
  margin-right: 5px;
  color: #555;
}

.stat-value {
  color: #666;
}

.player-bio {
  margin-bottom: 20px;
}

.bio-title {
  font-size: 1.5em;
  color: #444;
  margin-bottom: 10px;
}

.bio-content {
  color: #555;
  line-height: 1.6;
}

.back-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.back-button:hover {
  background-color: #0056b3;
}

/* Adapt colors to the resume theme as needed */
```

```json
{
  "data": {
    "playerProfile": {
      "playerId": 123,
      "playerName": "Lionel Messi",
      "imageUrl": "https://example.com/messi.jpg",
      "teamName": "Paris Saint-Germain",
      "position": "Forward",
      "age": 34,
      "bio": "Lionel Messi is an Argentinian professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and captains the Argentina national team."
    }
  }
}