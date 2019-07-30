import { Component } from '@angular/core';
import { VersionService } from './services/version.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular HTTP interceptors example';
  response = "";

  constructor(
    private versionSrv: VersionService
  ){}

  clear() {
    this.response = "";
  }

  getService(): void {
    const self = this;
    this.versionSrv.getVersion()
    .subscribe(
        res => {
          self.response = `${self.response}\n\n${new Date().toString()}\n${JSON.stringify(res)}` ;
          // console.log('HTTP response: ', self.response)
        },
        err => {
          self.response = JSON.stringify({err});
          // console.log('HTTP Error', self.response)
        },
        // () => console.log('HTTP request completed.')
    );
  }
}
