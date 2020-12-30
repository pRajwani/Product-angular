import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private update:SwUpdate, private appRef: ApplicationRef) {
    this.updateClient();
    this.checkUpdate();
  }

  updateClient(){
    if(!this.update.isEnabled){
      console.log("Updates not enabled");
      return;
    }
    this.update.available.subscribe((event)=>{
        console.log(event);
        if(confirm("Update the App?")){
          this.update.activateUpdate().then(()=>location.reload())
        }
    })
  }
  
  checkUpdate() {
    this.appRef.isStable.subscribe((isStable)=>{
      if(isStable){
        setInterval(()=>{
          this.update.checkForUpdate().then(()=>{console.log("Checked for new update")})
        }, 60*10**3*5)
      }
    })
  }
}
