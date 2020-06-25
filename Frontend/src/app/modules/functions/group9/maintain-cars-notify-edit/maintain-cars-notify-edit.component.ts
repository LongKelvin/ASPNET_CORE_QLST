import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Group9BaoTriServiceProxy, Group9BaoTriDto } from '@shared/service-proxies/service-proxies';
import { environment } from 'environments/environment';
import { Table } from "primeng/components/table/table";
import { Paginator, SelectItem } from "primeng/primeng";
import * as moment from 'moment';
import { Console } from 'console';


@Component({
    selector: 'app-maintain-cars-notify-add',
    templateUrl: './maintain-cars-notify-edit.component.html',
    styleUrls: ['./maintain-cars-notify-edit.component.css', '../../style.less']
})
export class MaintainCarsNotifyEditComponent extends AppComponentBase implements OnInit, AfterViewInit {

    constructor(injector: Injector, private group9BaoTriService: Group9BaoTriServiceProxy) {
        super(injector);
        // this.carService.getCurrentUserName().subscribe(response=>{
        //   this.currentUserName = response;
        // })
        console.log(this);
    }

    maxe: number;
    mataixe: number;
    tinhtrang: string;
    ngaybaotri: moment.Moment;
    ngaytao: moment.Moment;
    ngayxuatxuong: moment.Moment;
    nguoitao: string;
    trangthai: string;
    thanhtien: number;
    noibaotri: string;
    ghichu: string;

    luudialog: boolean;

    filterInput: Group9BaoTriDto = new Group9BaoTriDto();
    records: Group9BaoTriDto[] = [];
    group9BaoTriInput: Group9BaoTriDto = new Group9BaoTriDto();
    currentId: number;
    saving = false;


    ngAfterViewInit(): void {
        throw new Error("Method not implemented.");
    }

    getValue() {
        this.group9BaoTriInput.baoTri_MaXe = this.maxe;
        this.group9BaoTriInput.baoTri_MaTaiXe = this.mataixe;
        this.group9BaoTriInput.baoTri_TinhTrangBaoTri = this.tinhtrang;
        this.group9BaoTriInput.baoTri_NgayBaoTri = this.ngaybaotri;
        this.group9BaoTriInput.baoTri_NgayTao = this.ngaytao;
        this.group9BaoTriInput.baoTri_NgayXuatXuong = this.ngayxuatxuong;
        this.group9BaoTriInput.baoTri_NguoiTao = this.nguoitao;
        this.group9BaoTriInput.baoTri_TrangThai = this.trangthai;
        this.group9BaoTriInput.baoTri_ThanhTien = this.thanhtien;
        this.group9BaoTriInput.baoTri_NoiBaoTri = this.noibaotri;
        this.group9BaoTriInput.baoTri_GhiChu = this.ghichu;
        // console.log(`[getValue] loainhienlieu: ${this.loainhienlieu}`);
    }

    commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
    }

    formatCurrency(getValue){

        $('#Gia').val(this.commaSeparateNumber($('#Gia').val().toString().split(',').join("")));
     
      }

  

    checkvalue(): boolean {
        if (this.maxe == null) {
            this.notify.error("Bạn chưa nhập mã xe", "ERROR", environment.opt);
            return false;
        }
        else if (this.tinhtrang == null || this.tinhtrang == '') {
            this.notify.error("Bạn chưa nhập tình trạng xe", "ERROR", environment.opt);
            return false;
        }
        else if (this.ngaybaotri == null) {
            this.notify.error("Bạn chưa nhập ngày bảo trì", "ERROR", environment.opt);
            return false;
        }
        else if (this.ngayxuatxuong == null) {
            this.notify.error("Bạn chưa nhập ngày xuất xưởng", "ERROR", environment.opt);
            return false;
        }
        else if (this.noibaotri == null || this.noibaotri == '') {
            this.notify.error("Bạn chưa nhập nơi bảo trì", "ERROR", environment.opt);
            return false;
        }
        else if (this.ghichu == null || this.ghichu == '') {
            this.notify.error("Bạn chưa nhập ghi chú", "ERROR", environment.opt);
            return false;
        }
        else if (this.nguoitao == null || this.nguoitao == '') {
            this.notify.error("Bạn chưa nhập người tạo", "ERROR", environment.opt);
            return false;
        }
        return true;
    }

    luuconfirm() {
        if (this.checkvalue() == true) {
            this.luudialog = true;
        }
    }

    huyconfirm() {
        this.maxe = null;
        this.tinhtrang = null;
        this.ngaybaotri = null;
        this.ngayxuatxuong = null;
        this.noibaotri = null;
        this.thanhtien = null;
        this.ghichu = null;
        this.nguoitao = null;
    }

    ngOnInit() {
    }

}
