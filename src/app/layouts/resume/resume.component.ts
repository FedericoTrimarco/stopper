import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ResumeLayoutRoutes } from "./resume.routes";

@Component({
    selector: "app-resume",
    templateUrl: "./resume.component.html",
    styleUrls: ["./resume.component.scss"],
    standalone: false,
})
export class ResumeComponent implements OnInit {

    // VAR
    mainPagePath: string = "/resume";

    constructor(
        private route: ActivatedRoute,
        private title: Title,
        private location: Location
    ) {}

    ngOnInit() {
        this.title.setTitle(this.route.snapshot.data["title"]);
    }

    get isMainPage(): boolean{
      
      return this.location.path() == this.mainPagePath ? true : false;
    }
}
