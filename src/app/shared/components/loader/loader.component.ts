import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public show: boolean = true;

  constructor() {
    setTimeout(() => {
      this.show = false;
    }, 1500);
  }

  ngOnInit() { }

  ngOnDestroy() { }

}
