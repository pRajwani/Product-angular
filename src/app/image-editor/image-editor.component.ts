import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
  }

  uploadImage(event) {
    this.productService.setProductImage(event.target.files[0])
  }
}
