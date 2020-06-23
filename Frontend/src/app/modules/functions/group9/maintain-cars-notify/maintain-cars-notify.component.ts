import { environment } from './../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import { Group9BaoTriServiceProxy, Group9BaoTriDto } from '@shared/service-proxies/service-proxies';

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

    constructor(injector: Injector,  private group9BaoTriXeService: Group9BaoTriServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    currentUserName: string;
    ngOnInit() {
    }
    ngAfterViewInit(): void {
        this.search();
    }
    // Constants
    CAR_ID: string = "carCode";
    DEFAULT_OPT: object = { name: "Tất cả", value: "-1" };

    // Some stuff
    carInput: Group9BaoTriDto = new Group9BaoTriDto();
    carRecords: Group9BaoTriDto[] = [];

     //Car Id
    carIdOpts: Array<object> = [];
    carIdSuggestions: Array<object> = [];
    carIdOpt: object = {};

    onKeyUp(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    filterCarId(event) {
        this.carInput.baoTri_MaXe = event.query.trim();
        this.carIdSuggestions = this.carIdOpts.filter(opt => {
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
        this.carIdOpt = [{ name: "Tất cả", value: "-1" }]
    }

    clearOption(type) {
        switch (type) {
            case "carTypeName":
                this.carInput.baoTri_MaXe = -1;
                break;
            default:
                break;
        }
    }

    validateFilterInput(inputType) {
        switch (inputType) {
            case this.CAR_ID:
                this.carInput.baoTri_MaXe = this.carIdOpt["value"];
                break;
            default:
                break;
        }
    }


    // delete() {
    //     let self = this;
    //     self.message.confirm(
    //         self.l('Xoá thông báo này ? '),
    //         this.l('AreYouSure'),
    //         isConfirmed => {
    //             if (isConfirmed) {
    //                 this.group9BaoTriXeService.group9BaoTri_Delete(this.curCarTypeId).subscribe((response) => {
    //                     if (response["Result"] === "1") {
    //                         this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
    //                     } else {
    //                         this.notify.success("Xóa loại xe thành công", "SUCCESS", environment.opt);
    //                         this.resetOptions();
    //                         this.curCarTypeId = null;
    //                         this.search();
    //                     }
    //                 });
    //             }
    //         }
    //     );
    // }

    search() {
        // show loading trong gridview
        this.primengTableHelper.showLoadingIndicator();
        this.group9BaoTriXeService.group9BaoTri_Search(this.carInput)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                    let carIdOpt_ = {
                        name: item.baoTri_MaXe,
                        value: item.baoTri_MaXe
                    }
                    let carDate = {
                        name: item.baoTri_NgayBaoTri.toString(),
                        value: item.baoTri_NgayBaoTri.toString()
                    }
                    this.checkIndexOfOption(this.carIdOpt, carIdOpt_);
                  //  this.checkIndexOfOption(this.ca, newCarTypeOpt);
                });
                result.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                this.primengTableHelper.totalRecordsCount = result.length;
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }
}
