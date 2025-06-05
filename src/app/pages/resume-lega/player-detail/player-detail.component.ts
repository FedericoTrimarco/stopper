import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { LegaService } from "../lega.service";
import { Location, CommonModule } from "@angular/common";

@Component({
  selector: "app-player-detail",
  imports: [RouterModule, CommonModule],
  templateUrl: "./player-detail.component.html",
  styleUrl: "./player-detail.component.scss",
  providers: [LegaService],
})
export class PlayerDetailComponent implements OnInit {
  idPlayer: any;
  playerDetail: any;

  // Stati di caricamento
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private legaService: LegaService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params["id"]) {
        this.idPlayer = parseInt(params["id"]);
        this.loadPlayerProfile();
      }
    });
  }

  onBackClick(): void {
    this.location.back();
  }

  loadPlayerProfile() {
    const storedPlayer = localStorage.getItem(`playersDetail${this.idPlayer}`);
    
    if(storedPlayer != null){
      this.isLoading = false;
      this.hasError = false;
      
      this.playerDetail = JSON.parse(storedPlayer);

<<<<<<< HEAD
      console.log("player detail storage >> ", this.playerDetail);
      
    } else {

      this.isLoading = true;
      this.hasError = false;
      this.errorMessage = "";
  
      this.legaService.loadPlayerProfile(this.idPlayer).then((res) => {
=======
    this.legaService.loadPlayerProfile(this.idPlayer).subscribe({
      next: (res) => {
>>>>>>> 40133a7368a32f17430baaeb306f0d383260f306
        if (res != null && res.data != null && res.data.playerProfile != null) {
          this.playerDetail = res.data.playerProfile;
          this.isLoading = false;
          this.hasError = false;
<<<<<<< HEAD
          localStorage.setItem(`playersDetail${this.idPlayer}`, JSON.stringify(this.playerDetail));
=======
>>>>>>> 40133a7368a32f17430baaeb306f0d383260f306
        } else {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = "Errore durante la ricerca del giocatore";
<<<<<<< HEAD
          localStorage.setItem(`playersDetail${this.idPlayer}`, JSON.stringify(this.playerDetail));
        }
      });

    }
=======
        }
      },
      error: (error) => {
        console.error('Errore nel caricamento del profilo giocatore:', error);
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = "Errore durante la ricerca del giocatore";
      }
    });
>>>>>>> 40133a7368a32f17430baaeb306f0d383260f306
  }

  onImageError(event: any): void {
    event.target.src = "https://img.a.transfermarkt.technology/portrait/medium/default.jpg?lm=1";
  }
}
