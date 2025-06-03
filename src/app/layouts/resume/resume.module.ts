import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResumeComponent } from "./resume.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ResumeFooterComponent } from "./resume-footer/resume-footer.component";
import { ResumeHeaderComponent } from "./resume-header/resume-header.component";
import { ResumeNavComponent } from "./resume-nav/resume-nav.component";
import { ResumeLayoutRoutes } from "./resume.routes";

@NgModule({
    declarations: [ResumeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ResumeLayoutRoutes),
        RouterOutlet,
        ResumeFooterComponent,
        ResumeHeaderComponent,
        ResumeNavComponent,
    ],
})
export class ResumeModule {}
