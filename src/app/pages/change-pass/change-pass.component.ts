import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { common } from 'src/app/app.common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestBase } from 'src/app/Models/input.model/RequestBase';
import { Account } from 'src/app/utils/services/Account.service';
import { DataTableDirective } from 'angular-datatables';
import { RequestLogin } from 'src/app/Models/input.model/RequestLogin';
import { ResponseLogin } from 'src/app/Models/output.model/ResponseLogin';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  public ChangePassForm: FormGroup;
  public m: RequestLogin;
  public LoginResult: ResponseLogin;
  public UserName: any;
  public Password: any;
  public Password2: any;
  public Password3: any;
  public com: common;
  isPassword: boolean = true;

  TitleVal: string
  requestObject: RequestLogin = new RequestLogin()
  constructor(
    public AccountServirce: Account,
    private toastr: ToastrService,
    private appService: AppService,
    public router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.ChangePassForm = new FormGroup({
      Password: new FormControl(null, Validators.required),
      Password2: new FormControl(null, Validators.required),
      Password3: new FormControl(null, Validators.required)
    });
    this.com = new common(this.router);
    this.com.CheckLogin();
  }
  show() {
    this.isPassword = !(this.isPassword);
  }

  ChangePass() {
    
    if (this.ChangePassForm.valid) {
      let a = this.com.getUserinfo();
      this.UserName = a.Info.UserName;
      this.Password = this.ChangePassForm.controls.Password.value;
      this.Password2 = this.ChangePassForm.controls.Password2.value;
      this.Password3 = this.ChangePassForm.controls.Password3.value;
      this.requestObject.UserName = a.Info.UserName;
      var checkregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
     // if (checkregex.test(this.Password2)) {
        if (this.Password2 == this.Password3) {
          let req = {
            UserName: this.UserName,
            Password: this.Password,
            NewPassword: this.Password2,
            UserCategory: 1
          }
          this.spinner.show()
          this.AccountServirce.ChangePass(req, a.Token)
            .subscribe(z => {
              this.spinner.hide();
              if (z.Status == 1) {
                this.toastr.success('Đổi mật khẩu thành công');
                this.router.navigate(['/']);
              } else {
                this.toastr.error(z.Message, 'Thao tác thất bại');
              }
            })
        } else { this.toastr.warning('Mật khẩu mới của bạn không trùng khớp', 'Thao tác thất bại'); }
     // } else {
      //  this.toastr.warning('Mật khẩu không đúng định dạng', 'Thao tác thất bại');
     //   this.TitleVal = 'Mật khẩu phải có ít nhất một chữ hoa , chữ thường , kí tự (không có khoảng trắng) và từ 6 kí tự trở lên'
    //  }
    } else {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin', 'Tác vụ thất bại');
    };
  }

}
