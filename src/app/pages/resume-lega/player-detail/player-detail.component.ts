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

}
