import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
@Component({
  selector: 'app-bags',
  templateUrl: './bags.component.html',
  styleUrls: ['./bags.component.scss']
})
export class BagsComponent implements OnInit {

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
    srcUrl: 'assets/images/portfolio/1.jpg',
    previewUrl: 'assets/images/portfolio/1.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/6.jpg',
    previewUrl: 'assets/images/portfolio/6.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/7.jpg',
    previewUrl: 'assets/images/portfolio/7.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/9.jpg',
    previewUrl: 'assets/images/portfolio/9.jpg'
  }
]
