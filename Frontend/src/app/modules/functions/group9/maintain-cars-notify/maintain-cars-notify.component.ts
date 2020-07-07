import { environment } from './../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import { Group9BaoTriServiceProxy, Group9BaoTriDto, Group4XeDto, Group4XeServiceProxy } from '@shared/service-proxies/service-proxies';
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
        private group9BaoTriServiceProxy: Group9BaoTriServiceProxy) {
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

    xe_list : Group4XeDto[];

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

    // Some stuff
    curCarTypeId: number;
    carTypeInput: Group4LoaiXeDto = new Group4LoaiXeDto();
    carTypeRecords: Group4LoaiXeDto[] = [];

    onKeyUp(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    filterCarTypeNameOpt(event) {
        this.carTypeInput.loaiXe_Ten = event.query.trim();
        this.carTypeNameSuggestions = this.carTypeNameOpts.filter(opt => {
            return opt["value"].includes(event.query);
        })
    }

    filterCarManufacturerOpt(event) {
        this.carTypeInput.loaiXe_Hang = event.query.toLowerCase().trim();
        this.carManufacturerSuggestions = this.carManufacturerOpts.filter(opt => {
            return opt["value"].includes(event.query);
        })
    }

    filterCarFuelOpt(event) {
        this.carFuelSuggestions = this.carFuelOpts.filter(opt => {
            return opt["name"].includes(event.query);
        })
    }

    filterCarYearOpt(event) {
        this.carTypeInput.loaiXe_NamSX = event.query;
        this.carYearSuggestions = this.carYearOpts.filter(opt => {
            return opt["value"].includes(event.query);
        })
    }

    checkIndexOfOption(array, option) {
        const index = array.findIndex(elm => elm["value"] === option["value"]);
        if (index === -1) {
            array.push(option)
        }
    }

    resetOptions() {
        this.carYearOpts = [{ name: "Tất cả", value: "-1" }]
    }

    clearOption(type) {
        switch (type) {
            case "carTypeName":
                this.carTypeInput.loaiXe_Ten = "";
                break;
            case "carManufacturer":
                this.carTypeInput.loaiXe_Hang = "";
                break;
            case "carFuel":
                this.carFuelOpt = this.DEFAULT_OPT;
                break;
            case "carYear":
                delete this.carTypeInput.loaiXe_NamSX;
                break;
            default:
                break;
        }
    }

    validateFilterInput(inputType) {
        switch (inputType) {
            case this.CAR_TYPE_NAME:
                this.carTypeInput.loaiXe_Ten = this.carTypeNameOpt["value"];
                break;
            case this.CAR_TYPE_MANUFACTURER:
                this.carTypeInput.loaiXe_Hang = this.carManufacturerOpt["value"];
                break;
            case this.CAR_FUEL:
                this.carFuelOpt["value"] === "-1" ?
                    delete this.carTypeInput.loaiXe_LoaiNhienLieu :
                    this.carTypeInput.loaiXe_LoaiNhienLieu = this.carFuelOpt["value"];
                break;
            case this.CAR_YEAR:
                this.carYearOpt["value"] === "-1" ?
                    delete this.carTypeInput.loaiXe_NamSX :
                    this.carTypeInput.loaiXe_NamSX = parseInt(this.carYearOpt["value"]);
                break;
            default:
                break;
        }
    }


    delete() {
        let self = this;
        self.message.confirm(
            self.l('Xoá loại xe này', this.curCarTypeId),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this.Group4LoaiXeServiceProxy.lOAIXE_Group4Delete(this.curCarTypeId).subscribe((response) => {
                        if (response["Result"] === "1") {
                            this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                        } else {
                            this.notify.success("Xóa loại xe thành công", "SUCCESS", environment.opt);
                            this.resetOptions();
                            this.curCarTypeId = null;
                            this.search();
                        }
                    });
                }
            }
        );
    }

    search() {
        // show loading trong gridview
        this.primengTableHelper.showLoadingIndicator();
        this.Group4LoaiXeServiceProxy.lOAIXE_Group4Search(this.carTypeInput)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                    let newCarTypeOpt = {
                        name: item.loaiXe_Ten,
                        value: item.loaiXe_Ten.toLowerCase()
                    }
                    let newCarManufactureOpt = {
                        name: item.loaiXe_Hang,
                        value: item.loaiXe_Hang.toLowerCase()
                    }
                    let newCarYear = {
                        name: item.loaiXe_NamSX.toString(),
                        value: item.loaiXe_NamSX.toString()
                    }
                    this.checkIndexOfOption(this.carYearOpts, newCarYear);
                    this.checkIndexOfOption(this.carTypeNameOpts, newCarTypeOpt);
                    this.checkIndexOfOption(this.carManufacturerOpts, newCarManufactureOpt);
                });
                result.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                this.primengTableHelper.totalRecordsCount = result.length;
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    
//     getListThongBao(){
//     this.group9BaoTriServiceProxy.group9BaoTri_Search().subscribe(
//       response => {
//         if (response["Result"] === "-1") {
//           this.notify.error(response["ErrorDesc"]);
//         } else {

//           this.dxCars = response;

//           this.primengTableHelper.totalRecordsCount = response.length;
//           this.primengTableHelper.records = response;
//           this.primengTableHelper.hideLoadingIndicator();

//           console.log(this.dxCars);
//         }
//       }
//     )
//   }
}
