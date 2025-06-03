import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { BagsComponent } from './bags/bags.component';
import { FashionComponent } from './fashion/fashion.component';
import { ShoesComponent } from './shoes/shoes.component';
import { WatchComponent } from './watch/watch.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio-gallery',
  imports:[BagsComponent,FashionComponent,ShoesComponent,WatchComponent,CommonModule],
  templateUrl: './portfolio-gallery.component.html',
  styleUrls: ['./portfolio-gallery.component.scss']
})

export class PortfolioGalleryComponent implements OnInit {

  public customizer: any = "all"
  items: GalleryItem[];
  imageData = data;

  constructor( public gallery: Gallery, public lightbox: Lightbox) {}

  ngOnInit() {
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
    const lightboxRef = this.gallery.ref('lightbox');
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });
    lightboxRef.load(this.items);
  }

  openGallery(val: any) {
    this.customizer = val ;
  }

}

const data = [
  {
    srcUrl: 'assets/images/portfolio/1.jpg',
    previewUrl: 'assets/images/portfolio/1.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/2.jpg',
    previewUrl: 'assets/images/portfolio/2.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/3.jpg',
    previewUrl: 'assets/images/portfolio/3.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/4.jpg',
    previewUrl: 'assets/images/portfolio/4.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/5.jpg',
    previewUrl: 'assets/images/portfolio/5.jpg'
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
