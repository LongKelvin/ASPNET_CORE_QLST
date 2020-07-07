import {
    environment
} from './../../../../../environments/environment.prod';
import {
    Component,
    ViewChild,
    OnInit,
    AfterViewInit,
    Injector
} from '@angular/core';
import {
    AppComponentBase
} from '@shared/common/app-component-base';
import {
    Table
} from "primeng/components/table/table";
import {
    Paginator
} from "primeng/primeng";
import {
    Group9HoatDongTaiXeServiceProxy,
    Group9HoatDongTaiXeDto,
    
} from "@shared/service-proxies/service-proxies";
import * as moment from 'moment';

@Component({
    selector: 'app-driver-schedule-add-group9',
    templateUrl: './driver-schedule-add.component.html',
    styleUrls: ['./driver-schedule-add.component.less', '../../style.less']
})
export class DriverScheduleAddComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;

    constructor(injector: Injector, private group9: Group9HoatDongTaiXeServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    //variable

    currentUserName: string;
    SCHEDULE_ID: number;
    START_DATE: number;
    END_DATE: number;
    KM_ACTUAL: number;
    KM_ESTIMATE: number;
    FUEL_ACTUAL: number;

    Save_Dialog: boolean;
    Cancel_Dialog: boolean;

    listScheduleID: Group9HoatDongTaiXeDto[];
    hoatDongTaiXeInput: Group9HoatDongTaiXeDto = new Group9HoatDongTaiXeDto();
    //selectedLoaiXe: Group4LoaiXeDto;



    getMaLichTrinh(): void {
        this.group9.hOATDONGTAIXE_Group9SearchAll().subscribe((result) => {
            this.listScheduleID = result;
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

    Save_Confirm() {
        if (this.checkvalue() == true) {
            this.Save_Dialog = true;
        }
    }

    Cancel_Confirm() {
        this.KM_ACTUAL = null;
        this.KM_ESTIMATE = null;
        this.SCHEDULE_ID = null;
        this.FUEL_ACTUAL = null;
        this.START_DATE = null;
        this.END_DATE = null;
      
    }

    getValue() {
        this.hoatDongTaiXeInput.hoatDongTaiXe_KmThucTe = this.KM_ACTUAL;
        this.hoatDongTaiXeInput.hoatDongTaiXe_KmUocTinh = 5;
        this.hoatDongTaiXeInput.hoatDongTaiXe_MaLichTrinh = this.SCHEDULE_ID;

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
        if (this.KM_ACTUAL == null  ) {
            this.notify.error("Bạn chưa nhập số km thực tế", "ERROR", environment.opt);
            return false;
        }
        if (this.KM_ACTUAL <1  ) {
            this.notify.error("Số km không hợp lệ", "ERROR", environment.opt);
            return false;
        }
        if (this.START_DATE == null) {
            this.notify.error("Bạn chưa nhập ngày bắt đầu", "ERROR", environment.opt);
            return false;
        }
        
        if (this.END_DATE == null) {
            this.notify.error("Bạn chưa nhập ngày kết thúc", "ERROR", environment.opt);
            return false;
        }
        return true;
    }

    selectDropDown() {
      //  this.SCHEDULE_ID = this.selectedLoaiXe.loaiXe_Hang;
        
    }


    ngOnInit() {}

    ngAfterViewInit(): void {

    }



    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }

    filterScheduleId() {}
    clearOption() {}
    validateFilterInput() {}
    onKeyUp(event) {
        if (event.keyCode === 13) {

        }
    }




}

