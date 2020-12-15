import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ImageRenderComponent } from '../image-render/image-render.component';
import { ImageEditorComponent } from '../image-editor/image-editor.component';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  products: any;
  user;
  newProduct;
  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.authentication();
  }

  setup() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  //smart-table events
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteProduct(event.data);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    var productImage = this.productService.getProductImage();
    event.newData.image = productImage.name;
    this.addProduct(event.newData, productImage, event);
  }

  onSaveConfirm(event) {
    var productImage = this.productService.getProductImage();
    if (productImage != undefined) {
      event.newData.image = productImage.name;
      this.updateProduct(event.newData, event, productImage);
      return;
    }
    this.updateProduct(event.newData, event);
    productImage = null;
  }

  //CRUD logic
  addProduct(product, productImage, event) {
    this.productService.addNewProduct(product).subscribe((resp) => {
      var image = new FormData();
      image.append('image', productImage, productImage.name);
      this.productService.uploadProductImage(image).subscribe((resp) => {
        event.confirm.resolve(product);
      });
    });
  }

  updateProduct(product, event, productImage?: File) {
    this.productService.updateProduct(product).subscribe((resp) => {
      if (productImage != undefined) {
        var image = new FormData();
        image.append('image', productImage, productImage.name);
        this.productService.uploadProductImage(image).subscribe((resp) => {
          event.data = event.newData;
          event.confirm.resolve(product);
        });
      }
      else {
        event.data = event.newData;
        event.confirm.resolve(product);
      }
    });
  }

  deleteProduct(product) {
    this.productService
      .deleteProduct({ _id: product._id })
      .subscribe();
  }

  //other Logics


  authentication() {
    var token = this.authService.getAccessToken();
    if (!token) {
      this.authService.getAToken().subscribe((token) => {
        console.log('token status', token);
        if (token.status == false) {
          console.log('in if cond');
          this.router.navigate(['login']);
          return;
        }
        this.authService.setUserDetails(token.result).subscribe((userData) => {
          console.log('in retriving user');
          this.user = userData;
          this.authService.setUser(this.user);
          console.log(this.user);
          this.setup();
        });
      });
    } else {
      this.authService.setUserDetails(token).subscribe((userData) => {
        this.user = userData;
        this.authService.setUser(this.user);
        this.setup();
      });
    }
  }

  //smart-table settings
  settings = {
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<img src="assets/images/icons/delete.svg" width="20" height="20" >'
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<img src="assets/images/icons/add.svg" width="20" height="20" >',
      createButtonContent: '<img src="assets/images/icons/check.svg" width="20" height="20" >',
      cancelButtonContent: '<img src="assets/images/icons/clear.svg" width="20" height="20" >',
    },
    edit: {
      editButtonContent: '<img src="assets/images/icons/edit.svg" width="20" height="20" >',
      saveButtonContent: '<img src="assets/images/icons/check.svg" width="20" height="20" >',
      cancelButtonContent: '<img src="assets/images/icons/clear.svg" width="20" height="20" >',
      confirmSave: true,
    },
    attr: {
      class: 'table table-striped table-bordered table-hover'
    },
    defaultStyle: false,
    columns: {
      productName: {
        title: 'Product Name',
      },
      description: {
        title: 'Description',
      },
      price: {
        title: 'Price',
        editor: {
          type: 'custom',
          component: CustomInputEditorComponent
        }
      },
      image: {
        title: 'Product Image',
        filter: false,
        sort: false,
        editor: {
          type: 'custom',
          component: ImageEditorComponent,
        },
        type: 'custom',
        renderComponent: ImageRenderComponent,
      },
    }
  };
}

@Component({
  selector: 'input-editor',
  template: `
    <input type="number"
           [(ngModel)]="cell.newValue"
           [name]="cell.getId()"
           [placeholder]="cell.getTitle()"
           [disabled]="!cell.isEditable()"
           (click)="onClick.emit($event)"
           (keydown.enter)="onEdited.emit($event)"
           (keydown.esc)="onStopEditing.emit()">
    `,
})
export class CustomInputEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }
}