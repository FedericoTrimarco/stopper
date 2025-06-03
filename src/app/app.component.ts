import { Component, Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd,Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public url: any;
  title = 'Unice';
 
  constructor( private router: Router, private _renderer2: Renderer2,  @Inject(DOCUMENT) private _document: Document) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }


  public ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.src  = `/assets/tilt.js`;   
    this._renderer2.appendChild(this._document.body, script);
  }

}
