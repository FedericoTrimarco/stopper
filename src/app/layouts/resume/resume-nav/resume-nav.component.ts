import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../shared/components/navigation/menu/menu.component';

@Component({
  selector: 'app-resume-nav',
  imports:[MenuComponent],
  templateUrl: './resume-nav.component.html',
  styleUrls: ['./resume-nav.component.scss']
})
export class ResumeNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
