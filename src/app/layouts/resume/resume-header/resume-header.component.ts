import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-header',
  imports:[CommonModule],
  templateUrl: './resume-header.component.html',
  styleUrls: ['./resume-header.component.scss']
})
export class ResumeHeaderComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
