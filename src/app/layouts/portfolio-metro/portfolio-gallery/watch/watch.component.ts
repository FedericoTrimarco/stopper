import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-watch',
  imports:[],
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  public customizer: any = "all"
  items: GalleryItem[];
 
  imageData = data;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }


  ngOnInit() {
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    const lightboxRef = this.gallery.ref('lightbox');
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });
    lightboxRef.load(this.items);
  }

}
const data = [
  {
    srcUrl: 'assets/images/portfolio/2.jpg',
    previewUrl: 'assets/images/portfolio/2.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/4.jpg',
    previewUrl: 'assets/images/portfolio/4.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/1.jpg',
    previewUrl: 'assets/images/portfolio/1.jpg'
  }
]
