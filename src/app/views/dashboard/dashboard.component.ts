import { Component, OnInit } from '@angular/core';
import { common } from 'src/app/app.common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data:any
  Token:any
  SinhVienDangO:any = 0
  QuyDinhKhoanNopChuaNop:any = 0
  DangKyChuaDuyet:any = 0
  public com: common;
  constructor(
    public router: Router
  ) { 
  }

  ngOnInit() {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.Token = a.Token;
    this.getList();
  }
  getList() {

  }
}
