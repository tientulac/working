import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { common } from 'src/app/app.common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoaiKiemDinhService } from 'src/app/utils/services/loai-kiem-dinh.service';
import { NhomCongTacService } from 'src/app/utils/services/nhom-cong-tac.service';
import { CapBanHanhService } from 'src/app/utils/services/cap-ban-hanh.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { HinhThucKiemDinhService } from 'src/app/utils/services/hinh-thuc-kiem-dinh.service';
import { TieuChiKiemDinhService } from 'src/app/utils/services/tieu-chi-kiem-dinh.service';
import { QuanLyMinhChungService } from 'src/app/utils/services/quan-ly-minh-chung.service';
import { KiemDinhKeHoachService } from 'src/app/utils/services/kiem-dinh-ke-hoach.service';
import { TieuChuanService } from 'src/app/utils/services/tieu-chuan.service';
import { TieuChiService } from 'src/app/utils/services/tieu-chi.service';
import { HoiDongKiemDinhService } from 'src/app/utils/services/hoi-dong-kiem-dinh.service';
import { ThanhVienService } from 'src/app/utils/services/thanhvien.service';
import { KetQuaKiemDinhService } from 'src/app/utils/services/ket-qua-kiem-dinh.service';
import { ExportService } from 'src/app/utils/services/export.service';

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-base',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        display: 'block'
      })),
      state('closed', style({
        opacity: 0,
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ]),
  ],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit {

  Data: any;
  selected_ID: any;
  searchString: any;
  UserID_get: any;
  UserName_get: any;
  checkInsert: boolean = false;

  constructor(
    public modalService: NgbModal,
    public router: Router,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public datePipe: DatePipe,
    public dialog: MatDialog,
    public Transaction: BrowserAnimationsModule,
    public ExportService: ExportService,
    public LoaiKiemDinhService: LoaiKiemDinhService,
    public NhomCongTacService: NhomCongTacService,
    public CapBanHanhService: CapBanHanhService,
    public HinhThucKiemDinhService: HinhThucKiemDinhService,
    public TieuChiKiemDinhService: TieuChiKiemDinhService,
    public QuanLyMinhChungService: QuanLyMinhChungService,
    public KiemDinhKeHoachService: KiemDinhKeHoachService,
    public TieuChuanService: TieuChuanService,
    public TieuChiService: TieuChiService,
    public HoiDongKiemDinh: HoiDongKiemDinhService,
    public ThanhVien: ThanhVienService,
    public KetQuaKiemDinhService: KetQuaKiemDinhService,
  ) { }

  ngOnInit(): void {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.Token = a.Token;
    this.UserID_get = a.Info.UserID;
    this.UserName_get = a.Info.UserName;
  }

  titleModal: any = ""
  isInsert: any
  closeResult: string
  DateNow = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  Token: any = this.getToken()
  com: common;
  arrNumberPage: any = [];
  arrNumberPage_chil: any
  numberPage: any;
  page: any = 1;
  pageSize: any = 20;
  pageSizes: any = [20, 50, 100, 200, 500, 1000, 'T???t c???'];
  totalItem: number = 0
  totalItemFilter: any
  isDisplay: boolean = true;
  submitted = false;
  dataTable = [];
  dataChecked = [];
  dataTieuChuan = []
  dataThanhVien = []
  dataNhomCongTac = []
  dataKiemDinhKeHoach = []

  buttonFilter() {
    this.isDisplay = !this.isDisplay;
  }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkAllCheckBox(ev) {
    this.dataTable.forEach(x => x.checked = ev.target.checked)
  }

  isAllCheckBoxChecked() {
    if (this.dataTable != undefined)
      return this.dataTable.every(p => p.checked);
  }

  test() {
    this.dataChecked = this.dataTable.filter(x => x.checked == true)
    console.log(this.dataChecked)
  }

  onClose() {
    this.modalService.dismissAll('');
  }

  refesh() {
    window.location.reload();
  }

  modalServiceOpen(content, size) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: size })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  createNumberPage(totalItem, pageSize) {
    let numberPage = 0
    let arrNumberPage = []
    if (totalItem % pageSize == 0) {
      numberPage = Math.floor(totalItem / pageSize);
    } else {
      numberPage = Math.floor(totalItem / pageSize) + 1;
    }
    for (var i = 1; i <= numberPage; i++) {
      arrNumberPage.push(i);
    }
    let arrNumberPage_chil = []
    if (arrNumberPage.length > 4) {
      for (var i = 1; i <= 4; i++) {
        arrNumberPage_chil.push(i);
      }
    } else {
      arrNumberPage_chil = arrNumberPage;
    }
    return {
      numberPage: numberPage,
      arrNumberPage_chil: arrNumberPage_chil
    };
  }
  handlePageChange(event) {
    if (event == 'pre') {
      this.page = this.page - 1;
    } else if (event == 'next') {
      this.page = this.page + 1;
    } else {
      this.page = event;
      this.arrNumberPage_chil = [];
      for (var i = event - 3; i <= event + 3; i++) {
        if (i > 0 && i <= this.numberPage) {
          this.arrNumberPage_chil.push(i);
        }
      }
    }
  }
  xoa_dau(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??|???/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    str = str.replace(/??|??|???|???|??/g, "I");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    str = str.replace(/???|??|???|???|???/g, "Y");
    str = str.replace(/??/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huy???n, s???c, h???i, ng??, n???ng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // m?? ?? (??), m?? ??, m?? ?? (??)
    return str;
  }

  getToken() {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.Token = a.Token;
    this.UserID_get = a.Info.UserID;
    this.UserName_get = a.Info.UserName;
    return a.Token
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  isImage(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
      case 'docx':
      case 'doc':
      case 'gif':
      case 'png':
      case 'docx':
      case 'doc':
        return true;
    }
    return false;
  }
  messageAuthz(error) {
    if (error.status == 403 || error.status == 401) {
        this.toastr.warning("B???n kh??ng c?? quy???n th???c hi???n ch???c n??ng n??y!")
        this.spinner.hide()
        return false
    }else{
      this.toastr.error("???? c?? l???i x???y ra!")
      console.log(error)
    }
  }
}
