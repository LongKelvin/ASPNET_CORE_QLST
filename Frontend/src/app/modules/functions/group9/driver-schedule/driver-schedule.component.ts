

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
        private group4LOAIXE: Group4LoaiXeServiceProxy,

    ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
        //this.GetAllMaTaiXe();
        this.getMaLichTrinh();

        this.getByID();



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
  

    
    loaiXeInput: Group4LoaiXeDto =new Group4LoaiXeDto();
    selectedLoaiXe: Group4LichTrinhDto;

    hangxe: string;
    namsanxuat: string;
    dinhmucnguyenlieu: number;
    
    selectDropDown(){ 
      this.hangxe=this.selectedLoaiXe.lichTrinh_NgayDen.toString();
      this.namsanxuat=this.selectedLoaiXe.lichTrinh_NguoiTao;
      //this.dinhmucnguyenlieu=this.selectedLoaiXe.loaiXe_DinhMucNhienLieu;
  }

    getLoaiXe(): void {
    this.group4LichTrinhProxy.lICHTRINH_Group4Search(this.lichTrinhInput).subscribe((result) => {
            this.listScheduleID= result;
            
        });
  }

   
    getMaLichTrinh(): void {
        this.group4LichTrinhProxy.lICHTRINH_Group4Search(this.lichTrinhInput).subscribe((result) => {
            this.listScheduleID= result;
            
        });
        
    }

    getByID(){
         this.group4LichTrinhProxy.lICTRINH_Group4SearchById(4).subscribe((result) => {
            this.lichTrinhInput= result;
            
            this.lichtrinh_ma = this.lichTrinhInput.ma;
             this.lichtrinh_ngaytao = this.lichTrinhInput.lichTrinh_NgayTao.toString();
            this.lichtrinh_ngayden = this.lichTrinhInput.lichTrinh_NgayDen.toString();
            //this.lichTrinhInput.lichTrinh_NgayDen
        });
    }
    //----------

    GetAll(): void {
        this.lichTrinhInput.ma = 4;
        this.primengTableHelper.showLoadingIndicator();
        this.group4LichTrinhProxy.lICHTRINH_Group4Search(this.lichTrinhInput).subscribe((result) => {
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

    GetAllMaTaiXe() {
        this.group4LichTrinhProxy.lICHTRINH_Group4Search(this.taiXeLichTrinhInput).subscribe((result) => {
            this.listTaiXe = result;
        });
    }

    onOptionsSelected(event) {

    }
    ngOnInit() {
        this.GetAll();
      //  this.GetAllMaTaiXe();
    }

    ngAfterViewInit(): void {

    }


}
