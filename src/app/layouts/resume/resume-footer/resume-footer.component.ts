import { Component, OnInit } from '@angular/core';
import { TapToTopComponent } from '../../../shared/components/tap-to-top/tap-to-top.component';

@Component({
  selector: 'app-resume-footer',
  imports:[TapToTopComponent],
  templateUrl: './resume-footer.component.html',
  styleUrls: ['./resume-footer.component.scss']
})
export class ResumeFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
