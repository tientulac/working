import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { version } from './../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  version:any= '1.0.0';
  versionDetail:any;
    constructor(
      private http: HttpClient
    ) { }
  

  ngOnInit() {
    this.http.get<any>('assets/version.json').subscribe(data => {
      this.version=data.version 
      
  })
  }
}
