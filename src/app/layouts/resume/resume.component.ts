import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  standalone: false
})
export class ResumeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {

    this.title.setTitle(this.route.snapshot.data['title']);
  }

}
