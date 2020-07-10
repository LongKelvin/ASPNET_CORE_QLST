import { environment } from './../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import { Group9BaoTriServiceProxy, Group9BaoTriDto, Group4XeDto, Group4XeServiceProxy, Group10ServiceProxy, Group4LichTrinhServiceProxy } from '@shared/service-proxies/service-proxies';
import {
    Group4LoaiXeDto,
    Group4LoaiXeServiceProxy,
    
} from "@shared/service-proxies/service-proxies";


@Component({
    selector: 'app-maintain-cars-notify',
    templateUrl: './maintain-cars-notify.component.html',
    styleUrls: ['./maintain-cars-notify.component.css', '../../style.less']
})


export class MaintainCarsNotifyComponent extends AppComponentBase implements OnInit, AfterViewInit {
    /**
     *
     */
    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    constructor(injector: Injector, private Group4LoaiXeServiceProxy: Group4LoaiXeServiceProxy,
        private group4XeService: Group4XeServiceProxy,
        private group9BaoTriServiceProxy: Group9BaoTriServiceProxy,
        private group9BaoTriService: Group9BaoTriServiceProxy,) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
        this.group4XeService.xE_Group4Search({} as any).subscribe(response=>{
            this.xe_list = response;
        })

        console.log(this);
    }

    currentUserName: string;
    ngOnInit() {
    }
    ngAfterViewInit(): void {
        this.search();
    }
    // Constants
    CAR_TYPE_NAME: string = "carTypeName";
    CAR_TYPE_MANUFACTURER: string = "carManufacturer";
    CAR_FUEL: string = "carFuel";
    CAR_YEAR: string = "carYear";
    DEFAULT_OPT: object = { name: "Tất cả", value: "-1" };

    MA_XE: string = "maXe";
    baotri_maxe: number
    selectedLevel:number

    xe_list : Group4XeDto[];
    baotri_list : Group9BaoTriDto[];
    group9BaoTriInput : Group9BaoTriDto = new Group9BaoTriDto();

    //Car Year
    carYearOpts: Array<object> = [{ name: "Tất cả", value: "-1" }];
    carYearSuggestions: Array<object> = [];
    carYearOpt: object = this.DEFAULT_OPT;

    //Car Type Name
    carTypeNameOpts: Array<object> = [];
    carTypeNameSuggestions: Array<object> = [];
    carTypeNameOpt: object = {};

    //Car Manufacturer
    carManufacturerOpts: Array<object> = [];
    carManufacturerSuggestions: Array<object> = [];
    carManufacturerOpt: object = {};

    //Car Fuel
    carFuelOpts: Array<object> = [
        { name: "Tất cả", value: "-1" },
        { name: "Xăng", value: "X" },
        { name: "Dầu", value: "D" }
    ];
    carFuelSuggestions: Array<object> = [];
    carFuelOpt: object = this.DEFAULT_OPT;

    baotri_group9_ma: Array<object> = [];

    baotri_group9_maxe: Array<object> = [];
  
    baotri_group9_ngaybaotri: Array<object> = [];
  
    baotri_group9_ngayxuatxuong: Array<object> = [];

    baotri_group9_thanhtien: Array<object> = [];

    baotri_group9_nguoitao: Array<object> = [];

    baotri_group9_ngaytao: Array<object> = [];
    
    // Some stuff
    curMaBaoTri: number;
    baoTriInput: Group9BaoTriDto = new Group9BaoTriDto();
    baoTriRecords: Group9BaoTriDto[] = [];

    onKeyUp(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    // filterCarTypeNameOpt(event) {
    //     this.carTypeInput.loaiXe_Ten = event.query.trim();
    //     this.carTypeNameSuggestions = this.carTypeNameOpts.filter(opt => {
    //         return opt["value"].includes(event.query);
    //     })
    // }

    // filterCarManufacturerOpt(event) {
    //     this.carTypeInput.loaiXe_Hang = event.query.toLowerCase().trim();
    //     this.carManufacturerSuggestions = this.carManufacturerOpts.filter(opt => {
    //         return opt["value"].includes(event.query);
    //     })
    // }

    // filterCarFuelOpt(event) {
    //     this.carFuelSuggestions = this.carFuelOpts.filter(opt => {
    //         return opt["name"].includes(event.query);
    //     })
    // }

    // filterCarYearOpt(event) {
    //     this.carTypeInput.loaiXe_NamSX = event.query;
    //     this.carYearSuggestions = this.carYearOpts.filter(opt => {
    //         return opt["value"].includes(event.query);
    //     })
    // }

    // checkIndexOfOption(array, option) {
    //     const index = array.findIndex(elm => elm["value"] === option["value"]);
    //     if (index === -1) {
    //         array.push(option)
    //     }
    // }

    // resetOptions() {
    //     this.carYearOpts = [{ name: "Tất cả", value: "-1" }]
    // }

    // clearOption(type) {
    //     switch (type) {
    //         case "carTypeName":
    //             this.carTypeInput.loaiXe_Ten = "";
    //             break;
    //         case "carManufacturer":
    //             this.carTypeInput.loaiXe_Hang = "";
    //             break;
    //         case "carFuel":
    //             this.carFuelOpt = this.DEFAULT_OPT;
    //             break;
    //         case "carYear":
    //             delete this.carTypeInput.loaiXe_NamSX;
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // validateFilterInput(inputType) {
    //     switch (inputType) {
    //         case this.CAR_TYPE_NAME:
    //             this.carTypeInput.loaiXe_Ten = this.carTypeNameOpt["value"];
    //             break;
    //         case this.CAR_TYPE_MANUFACTURER:
    //             this.carTypeInput.loaiXe_Hang = this.carManufacturerOpt["value"];
    //             break;
    //         case this.CAR_FUEL:
    //             this.carFuelOpt["value"] === "-1" ?
    //                 delete this.carTypeInput.loaiXe_LoaiNhienLieu :
    //                 this.carTypeInput.loaiXe_LoaiNhienLieu = this.carFuelOpt["value"];
    //             break;
    //         case this.CAR_YEAR:
    //             this.carYearOpt["value"] === "-1" ?
    //                 delete this.carTypeInput.loaiXe_NamSX :
    //                 this.carTypeInput.loaiXe_NamSX = parseInt(this.carYearOpt["value"]);
    //             break;
    //         default:
    //             break;
    //     }
    // }


    delete() {
        let self = this;
        self.message.confirm(
            self.l('Xoá loại xe này', this.curMaBaoTri),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this.group9BaoTriService.bAOTRI_Group9Delete(this.curMaBaoTri).subscribe((response) => {
                        if (response["Result"] === "1") {
                            this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                        } else {
                            this.notify.success("Xóa loại xe thành công", "SUCCESS", environment.opt);
                            //this.resetOptions();
                            this.curMaBaoTri = null;
                            this.search();
                        }
                    });
                }
            }
        );
    }

    search() {
        // show loading trong gridview
        this.getValue();
        this.primengTableHelper.showLoadingIndicator();
        this.group9BaoTriService.bAOTRI_Group9Search(this.group9BaoTriInput)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                

                });
                result.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                this.primengTableHelper.totalRecordsCount = result.length;
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    
    getListThongBao(){
        this.group9BaoTriService.bAOTRI_Group9Search({} as any).subscribe(response=>{
            this.baotri_list = response;
        });
    
  }
  
  getValue() {
      this.group9BaoTriInput.baoTri_MaBaoTri = null;
    this.group9BaoTriInput.baoTri_MaXe = this.selectedLevel;
    this.group9BaoTriInput.baoTri_MaBaoTri = null;
    this.group9BaoTriInput.baoTri_TinhTrangBaoTri = null;
    this.group9BaoTriInput.baoTri_NgayDuyet = null;
    this.group9BaoTriInput.baoTri_NgayTao = null;
    this.group9BaoTriInput.baoTri_NgayXuatXuong = null;
    this.group9BaoTriInput.baoTri_NguoiTao = null;
    this.group9BaoTriInput.baoTri_TrangThai = null;
    this.group9BaoTriInput.baoTri_ThanhTien = null;
    this.group9BaoTriInput.baoTri_NoiBaoTri = null;
    this.group9BaoTriInput.baoTri_GhiChu = null;
    this.group9BaoTriInput.baoTri_NguoiDuyet = null;
    // console.log(`[getValue] loainhienlieu: ${this.loainhienlieu}`);
  }
  selectOption(id: number) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.selectedLevel)
    this.notify.error("Không tìm thấy dữ liệu", this.selectedLevel.toString(), environment.opt);

    this.search()

  }
}
