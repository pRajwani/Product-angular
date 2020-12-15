import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-render',
  templateUrl: './image-render.component.html',
  styleUrls: ['./image-render.component.scss']
})
export class ImageRenderComponent implements OnInit {

  constructor() { }
  @Input() value;
  baseUrl='assets/images/product/'
  ngOnInit(): void {
  }

}
