

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
    Group4TuyenChayServiceProxy, Group4TuyenChayDto,

    Group4LoaiXeServiceProxy, Group4LoaiXeDto,

} from "@shared/service-proxies/service-proxies";
import { result } from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'app-driver-schedule-group9',
    templateUrl: './driver-schedule.component.html',
    styleUrls: ['./driver-schedule.component.less', '../../style.less']
})
export class DriverScheduleComponent extends AppComponentBase implements OnInit, AfterViewInit {

    empty_value: any[];

    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;

    constructor(injector: Injector, private group9: Group9HoatDongTaiXeServiceProxy,
        private group4LichTrinhProxy: Group4LichTrinhServiceProxy,
        private group4_TuyenChayProxy: Group4TuyenChayServiceProxy,
        private group4LOAIXE: Group4LoaiXeServiceProxy,

    ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
        //this.GetAllMaTaiXe();
        this.getMaTaiXe();
        this.empty_value = [
            {name:"Tất cả", value:0}
        ]

    }

    currentUserName: string;
    currentId: number;

    // Constants
    listHoatDongTaiXe: Group9HoatDongTaiXeDto[];
    selectedHoatDongTaiXe: Group9HoatDongTaiXeDto;
    HoatDongTaiXeInput: Group9HoatDongTaiXeDto = new Group9HoatDongTaiXeDto();

    listTaiXe: Group4LichTrinhDto[];
    selectedTaiXe: Group4LichTrinhDto;
    taiXeLichTrinhInput: Group4LichTrinhDto = new Group4LichTrinhDto();

    DRIVER_ID: number;
    START_DATE: Date;
    END_DATE: Date;
    user_name: string;

    listScheduleID: Group4LichTrinhDto[];
    lichTrinhInput: Group4LichTrinhDto = new Group4LichTrinhDto();
    selectedDropdownLichTrinh: Group4LichTrinhDto;

    listResult: Group4LichTrinhDto[];

    lichtrinh_ma: number;
    lichtrinh_ngaytao: string;
    lichtrinh_ngayden: string


    loaiXeInput: Group4LoaiXeDto = new Group4LoaiXeDto();
    selectedLoaiXe: Group4LichTrinhDto;

    hangxe: string;
    namsanxuat: string;
    dinhmucnguyenlieu: number;

    listMaLichTrinhByTaiXe: Group4LichTrinhDto[];
    taiXeInput: Group4LichTrinhDto = new Group4LichTrinhDto();
    selectedLichTrinh: Group4LichTrinhDto;
    SCHEDULE_ID: number;

    listScheduleID_unquiet: Group4LichTrinhDto[];

   
    getMaTaiXe(): void {
        this.group4LichTrinhProxy.lICHTRINH_Group4Search(this.lichTrinhInput).subscribe((result) => {
            this.listScheduleID = result;
            this.RemoveDuplicateValue_();
        });
        
    }

    RemoveDuplicateValue_() {
        let count = 0;
        let start = false;

        for (let j = 0; j < this.listScheduleID.length; j++) {
            for (let k = 0; k < this.listScheduleID_unquiet.length; k++) {
                if (this.listScheduleID[j].lichTrinh_MaTaiXe == this.listScheduleID_unquiet[k].lichTrinh_MaTaiXe) {
                    start = true;
                }
            }
            count++;
            if (count == 1 && start == false) {
                this.listScheduleID_unquiet.push(this.listScheduleID[j]);
            }
            start = false;
            count = 0;
        }
    }

    getMaLichTrinhByTaiXe() {
        this.taiXeInput.lichTrinh_MaTaiXe = this.DRIVER_ID;
        this.group4LichTrinhProxy.lICHTRINH_Group4Search(this.taiXeInput).subscribe((result) => {
            this.listMaLichTrinhByTaiXe = result;
        });
    }

    onOptionsSelected(event) {
        if(this.DRIVER_ID==0){
             this.GetAll();
        }
        else
            this.getMaLichTrinhByTaiXe()
    }

    GetAll(): void {
        this.primengTableHelper.showLoadingIndicator();
        this.group9.hOATDONGTAIXE_Group9SearchAll().subscribe((result) => {
            let no = 1;
            result.forEach((item) => {
                item["no"] = no++;
            });

            this.primengTableHelper.totalRecordsCount = result.length;
            this.primengTableHelper.records = result;
            this.primengTableHelper.hideLoadingIndicator();

        });
    }

    Search() {
        this.primengTableHelper.showLoadingIndicator();
        this.group9.hOATDONGTAIXE_Group9Tracking(this.SCHEDULE_ID,moment(this.START_DATE),moment(this.END_DATE)).subscribe((result) => {
            let no = 1;
            result.forEach((item) => {
                item["no"] = no++;
            });
            this.primengTableHelper.totalRecordsCount = result.length;
            this.primengTableHelper.records = result;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }



    ngOnInit() {
        this.GetAll();

    }

    ngAfterViewInit(): void {

    }


}
