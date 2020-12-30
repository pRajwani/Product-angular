import { Component, OnInit } from '@angular/core';
import { PwaTestingService } from '../services/pwa-testing.service';
import { IndexedDbService } from '../services/indexed-db.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-pwa-testing',
  templateUrl: './pwa-testing.component.html',
  styleUrls: ['./pwa-testing.component.scss'],
})
export class PwaTestingComponent implements OnInit {
  constructor(
    private pwaTesting: PwaTestingService,
    private indexedDbService: IndexedDbService,
    private fb: FormBuilder,
    private uploadService: UploadService
  ) {}

  pwaForm: FormGroup;
  name;

  ngOnInit(): void {
    this.createForm();
    this.pwaTesting.getData().subscribe((data) => {
      console.log(data);
    });
  }

  createForm() {
    this.pwaForm = this.fb.group({
      name: [''],
      image: [''],
    });
  }

  send() {
    var form = this.pwaForm.value;
    var image = this.pwaForm.value.image;
    form.image = image.name;
    var uploadData = new FormData();
    uploadData.append('image', image, image.name);
    this.pwaTesting.sendData(form).subscribe(
      (resp) => {
        console.log('pwaTesting subscription ', resp);
        this.uploadService.uploadProductImage(uploadData).subscribe((resp) => {
          console.log('image upload subscription => ', resp);
        });
      },
      (err) => {
        console.log('offline error in pwaTesting =>', err);
        this.indexedDbService
          .addData(form)
          .then(() => {
            this.backgroundSyncForData();
            this.indexedDbService
              .addImage(image)
              .then(this.backgroundSyncForImage)
              .catch(console.log);
          })
          .catch(console.log);
      }
    );
    this.name = '';
  }

  backgroundSyncForData() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('post-data'))
      .catch(console.log);
  }

  backgroundSyncForImage() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('post-image'))
      .catch(console.log);
  }
}
