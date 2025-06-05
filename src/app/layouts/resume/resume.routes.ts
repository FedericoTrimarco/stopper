import { Routes } from "@angular/router";
import { ResumeLegaComponent } from "../../pages/resume-lega/resume-lega.component";
import { GironeDetailComponent } from "../../pages/resume-lega/girone-detail/girone-detail.component";
import { ClubDetailComponent } from "../../pages/resume-lega/club-detail/club-detail.component";
import { PlayerDetailComponent } from "../../pages/resume-lega/player-detail/player-detail.component";

export const ResumeLayoutRoutes: Routes = [
    {
        path: "resume",
        component: ResumeLegaComponent,
    },
    {
        path: "resume/girone-detail/:letter",
        component: GironeDetailComponent,
    },
    {
        path: "resume/club-detail/:id/:clubName",
        component: ClubDetailComponent,
    },
    {
        path: "resume/player-detail/:id",
        component: PlayerDetailComponent,
    },
];
