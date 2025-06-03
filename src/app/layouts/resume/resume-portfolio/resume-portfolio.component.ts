import { Component, OnInit } from '@angular/core';
import { PortfolioGalleryComponent } from '../../portfolio-metro/portfolio-gallery/portfolio-gallery.component';

@Component({
  selector: 'app-resume-portfolio',
  imports:[PortfolioGalleryComponent],
  templateUrl: './resume-portfolio.component.html',
  styleUrls: ['./resume-portfolio.component.scss']
})
export class ResumePortfolioComponent implements OnInit {


  constructor() {
  }

  ngOnInit() { }

}