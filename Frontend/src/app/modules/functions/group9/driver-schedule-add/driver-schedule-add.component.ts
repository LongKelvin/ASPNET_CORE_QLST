import { environment } from './../../../../../environments/environment.prod';
import { Component, ViewChild, OnInit, AfterViewInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import {
    Group9HoatDongTaiXeServiceProxy,
    Group9HoatDongTaiXeDto,
    Group4LichTrinhServiceProxy,
    Group4LichTrinhDto,
    Group4TuyenChayServiceProxy, Group4TuyenChayDto

} from "@shared/service-proxies/service-proxies";
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
    selector: 'app-driver-schedule-add-group9',
    templateUrl: './driver-schedule-add.component.html',
    styleUrls: ['./driver-schedule-add.component.less', '../../style.less']
})
export class DriverScheduleAddComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    //value: Date;

    constructor(injector: Injector,public router: Router, private group9: Group9HoatDongTaiXeServiceProxy,
        private group4LichTrinhProxy: Group4LichTrinhServiceProxy, 
        private group4_TuyenChayProxy: Group4TuyenChayServiceProxy
        ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
        this.getMaLichTrinh();
       
        
    }

    //variable

    currentUserName: string;
    SCHEDULE_ID: number;
    START_DATE: Date;
    END_DATE: Date;
    KM_ACTUAL: number;
    KM_ESTIMATE: number;
    FUEL_ACTUAL: number;

    Save_Dialog: boolean;
    Cancel_Dialog: boolean;

    
    hoatDongTaiXeInput: Group9HoatDongTaiXeDto = new Group9HoatDongTaiXeDto();

    listScheduleID: Group4LichTrinhDto[];
    lichTrinhinput: Group4LichTrinhDto = new Group4LichTrinhDto();
    selectedDropdownLichTrinh: Group4LichTrinhDto;

    maTuyenChay: number;
    tuyenChayInput: Group4TuyenChayDto = new Group4TuyenChayDto();
    listTuyenChay: Group4TuyenChayDto[];

    listResult: Group4LichTrinhDto[];

    start_date_ : string;
    end_date_ : string;


    getMaLichTrinh(): void {
        this.group4LichTrinhProxy.lICHTRINH_Group4Search({}as any).subscribe((result) => {
            this.listScheduleID= result;
        });
    }
    

    insert(): void {
        this.getValue();
        this.group9.hOATDONGTAIXE_Group9Insert(this.hoatDongTaiXeInput).subscribe((response) => {
            if (response["Result"] == "1") {
                this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
            } else {
                this.notify.success("Thêm hoạt động tài xế thành công", "SUCCESS", environment.opt);
            }
        });
    }

 
    Cancel_Confirm() {
        //this.Cancel_Dialog = true;
        let self = this;
            self.message.confirm(
            self.l('Bạn muốn huỷ bỏ tiến trình ?'),
            this.l('Thoát !!'),
            isConfirmed => {
                if (isConfirmed) {
                    this.ClearAllInputValue();
                }
            }
             );
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
            this.ReturnToHomePage();
        }

    }

    transformDate(date) {
     
  }

    
    ReturnToHomePage() {
        this.router.navigate(['/app/admin/driver-schedule']);
    }

    onOptionsSelected(event){
        this.lichTrinhinput.ma = this.SCHEDULE_ID;
        this.group4LichTrinhProxy.lICTRINH_Group4SearchById(this.SCHEDULE_ID).subscribe((result) => {
            this.selectedDropdownLichTrinh= result;
            this.START_DATE = this.selectedDropdownLichTrinh.lichTrinh_NgayDi.toDate();
            this.END_DATE = this.selectedDropdownLichTrinh.lichTrinh_NgayDen.toDate();
            var km = this.selectedDropdownLichTrinh.tuyenchay_SoKm;
            this.KM_ESTIMATE = +km;
            this.start_date_ =  this.selectedDropdownLichTrinh.lichTrinh_NgayDi.format('DD/MM/YYYY').toString();
            this.end_date_ =  this.selectedDropdownLichTrinh.lichTrinh_NgayDen.format('DD/MM/YYYY').toString();
        });
        this.tuyenChayInput.ma = this.maTuyenChay;
        // this.group4_TuyenChayProxy.tUYENCHAY_Group4Search(this.tuyenChayInput).subscribe((result) =>{
        //     this.listTuyenChay = result;
        //     var km = this.listTuyenChay[0].tuyenChay_SoKm.toString;
        //     var km_number = +km;
        //     this.KM_ESTIMATE = km_number;
        // });
    }
    getValue() {
        this.hoatDongTaiXeInput.hoatDongTaiXe_KmThucTe = this.KM_ACTUAL;
        this.hoatDongTaiXeInput.hoatDongTaiXe_KmUocTinh = this.KM_ESTIMATE;
        this.hoatDongTaiXeInput.hoatDongTaiXe_MaLichTrinh = this.SCHEDULE_ID;
        this.hoatDongTaiXeInput.hoatDongTaiXe_NgayBatDau =moment(this.START_DATE);
        this.hoatDongTaiXeInput.hoatDongTaiXe_NgayKetThuc = moment(this.END_DATE);

        var dateObj_NgayTao = new Date(Date.now());
        var momentObj_NgayTao = moment(dateObj_NgayTao);
        this.hoatDongTaiXeInput.hoatDongTaiXe_NgayTao = momentObj_NgayTao;

        this.hoatDongTaiXeInput.hoatDongTaiXe_NguoiTao = this.currentUserName;
        this.hoatDongTaiXeInput.hoatDongTaiXe_NhienLieu = this.FUEL_ACTUAL;

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

     Save_Confirm() {
         if (this.checkvalue() == true){
            let self = this;
            self.message.confirm(
            self.l('Bạn muốn lưu toàn bộ dữ liệu ?'),
            this.l('Lưu dữ liệu!!'),
            isConfirmed => {
                if (isConfirmed) {
                    this.insert();
                }
            }
           
        );
         }
    }
    ngOnInit() {
        this.getMaLichTrinh();
        //this.onOptionsSelected(event);
    }

    ngAfterViewInit(): void {
       
    }
}

