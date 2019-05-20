import { ImageService } from './services/image.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  images: any;

  constructor(private imageService: ImageService) {
    this.imageService.getImages().subscribe(res => {
      this.images = res;
      console.log(this.images);
    });
  }
}
