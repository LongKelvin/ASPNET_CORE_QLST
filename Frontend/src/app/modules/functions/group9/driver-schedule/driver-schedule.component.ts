import { environment } from './../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import {
    Group9HoatDongTaiXeServiceProxy,
    Group9HoatDongTaiXeDto,
    Group4LichTrinhServiceProxy,
    Group4LichTrinhDto,
    Group4TuyenChayServiceProxy, Group4TuyenChayDto, Group2TaiXeServiceProxy, 
    Group2TaiXeSearchInputDto, Group2TaiXeSearchDto,

} from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'app-driver-schedule-group9',
    templateUrl: './driver-schedule.component.html',
    styleUrls: ['./driver-schedule.component.less', '../../style.less']
})
export class DriverScheduleComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;

     constructor(injector: Injector, private group9: Group9HoatDongTaiXeServiceProxy,
        private group4LichTrinhProxy: Group4LichTrinhServiceProxy, 
        private group4_TuyenChayProxy: Group4TuyenChayServiceProxy,
        private group2TaiXe: Group2TaiXeServiceProxy,
        ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
       
       // this.selectedTaiXe.taiXe_Ma
        
    }

    currentUserName: string;
    currentId: number;

    // Constants
    listHoatDongTaiXe:Group9HoatDongTaiXeDto[];
    selectedHoatDongTaiXe: Group9HoatDongTaiXeDto;
    HoatDongTaiXeInput: Group9HoatDongTaiXeDto = new Group9HoatDongTaiXeDto();

    listTaiXe: Group2TaiXeSearchDto[];
    selectedTaiXe: Group2TaiXeSearchDto;
    taiXeInput: Group2TaiXeSearchInputDto = new Group2TaiXeSearchInputDto();

    DRIVER_ID: number;
    START_DATE: Date;
    END_DATE: Date;
    
    
    
    // function
    
    GetAll() : void {    
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

    Search(){
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

    GetAllMaTaiXe(){
        this.group2TaiXe.tAIXE_Group2Search(this.taiXeInput).subscribe((result) => {
            this.listTaiXe = result;
        });
    }

    onOptionsSelected(event){
        
    }
    ngOnInit() {
        this.GetAll();
        this.GetAllMaTaiXe();
    }
    
    ngAfterViewInit(): void {
       
    }
                                  

}
