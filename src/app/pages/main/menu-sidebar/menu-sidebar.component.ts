import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { common } from 'src/app/app.common';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private router: Router,
    private toastr: ToastrService,
    ) { }
  styleLi: string = 'nav-item ';
  public com: common;

  ngOnInit() {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var UserData = this.com.getUserinfo();
  }
  menu(id: string) {
    let element, name, arr;
    element = document.getElementById(id);
    arr = element.className.split(' ');
    name = 'menu-open';
    if (arr.indexOf(name) == -1) {
      element.className += ' ' + name;
    } else {
      element.className = 'nav-item';
    }
  }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
