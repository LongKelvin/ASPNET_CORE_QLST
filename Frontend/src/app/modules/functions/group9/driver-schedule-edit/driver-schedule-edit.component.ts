import { environment } from './../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import {
    Group9HoatDongTaiXeServiceProxy,
    Group9HoatDongTaiXeDto,
    
   
 

} from "@shared/service-proxies/service-proxies";
import * as moment from 'moment';

@Component({
    selector: 'app-driver-schedule-edit-group9',
    templateUrl: './driver-schedule-edit.component.html',
    styleUrls: ['./driver-schedule-edit.component.less', '../../style.less']
})
export class DriverScheduleEditComponent extends AppComponentBase implements OnInit, AfterViewInit {

   @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;

    constructor(injector: Injector, private group9Proxy: Group9HoatDongTaiXeServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
        //  this.hoatDongTaiXeInput.ma = this.getRouteParam("ma");
        this.hoatDongTaiXeInput.ma = 2;
    }

   
    currentUserName: string;
    SCHEDULE_ID: number;
    START_DATE: Date;
    END_DATE: Date;
    KM_ACTUAL: number;
    KM_ESTIMATE: number;
    FUEL_ACTUAL: number;
    DRIVER_ID: number;

    Save_Dialog: boolean;
    Cancel_Dialog: boolean;

    
    hoatDongTaiXeInput: Group9HoatDongTaiXeDto = new Group9HoatDongTaiXeDto();
    listHoatDongTaiXe: Group9HoatDongTaiXeDto[];
    selectedHoatDongTaiXe: Group9HoatDongTaiXeDto;

    

   
    createValue() {
    this.group9Proxy.hOATDONGTAIXE_Group9ById(this.hoatDongTaiXeInput.ma).subscribe((result) => {
        this.selectedHoatDongTaiXe = result;
        this.SCHEDULE_ID = this.selectedHoatDongTaiXe.hoatDongTaiXe_MaLichTrinh;
        this.START_DATE = this.selectedHoatDongTaiXe.hoatDongTaiXe_NgayBatDau.toDate();
        this.END_DATE = this.selectedHoatDongTaiXe.hoatDongTaiXe_NgayKetThuc.toDate();
        this.KM_ACTUAL = this.selectedHoatDongTaiXe.hoatDongTaiXe_KmThucTe;
        this.KM_ESTIMATE = this.selectedHoatDongTaiXe.hoatDongTaiXe_KmUocTinh;
        this.FUEL_ACTUAL = this.selectedHoatDongTaiXe.hoatDongTaiXe_NhienLieu;
    });

  }


    
    update(): void {
        this.getValue();
        this.group9Proxy.hOATDONGTAIXE_Group9Update(this.hoatDongTaiXeInput).subscribe((response) => {
            if (response["Result"] == "1") {
                this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
            } else {
                this.notify.success("Cập nhật hoạt động tài xế thành công", "SUCCESS", environment.opt);
            }
        });
    }

    Save_Confirm() {
        if (this.checkvalue() == true) {
            this.Save_Dialog = true;
        }
    }

    Cancel_Confirm() {
        this.Cancel_Dialog = true;
    }

    ClearAllInputValue() {
        if (this.KM_ACTUAL == null &&
            this.KM_ESTIMATE == null && this.SCHEDULE_ID == null
            && this.FUEL_ACTUAL == null) {
            this.ReturnToHomePage();
        }
        else {
            this.KM_ACTUAL = null;
            this.KM_ESTIMATE = null;
            this.SCHEDULE_ID = null;
            this.FUEL_ACTUAL = null;
            this.START_DATE = null;
            this.END_DATE = null;
        }

    }

    transformDate(date) {
     
  }

    
    ReturnToHomePage() {
        this.router.navigate(['/app/admin/driver-schedule']);
    }

    onOptionsSelected(event){
  
    }
    getValue() {
        this.hoatDongTaiXeInput.hoatDongTaiXe_KmThucTe = this.KM_ACTUAL;
        var dateObj_NgayTao = new Date(Date.now());
        var momentObj_NgayTao = moment(dateObj_NgayTao);
        this.hoatDongTaiXeInput.hoatDongTaiXe_NgayTao = momentObj_NgayTao;

        this.hoatDongTaiXeInput.hoatDongTaiXe_NguoiTao = this.currentUserName;
    }

    checkvalue(): boolean {
        if (this.SCHEDULE_ID == null) {
            this.notify.error("Bạn chưa chọn mã lịch trình", "ERROR", environment.opt);
            return false;
        }
        if (this.KM_ACTUAL == null) {
            this.notify.error("Bạn chưa nhập số km thực tế", "ERROR", environment.opt);
            return false;
        }
        if (this.KM_ACTUAL < 1) {
            this.notify.error("Số km không hợp lệ", "ERROR", environment.opt);
            return false;
        }

        return true;
    }

    ngOnInit() {
        this.createValue();
    }

    ngAfterViewInit(): void {
       
    }
}
