import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Group9BaoTriServiceProxy, Group9BaoTriDto, Group4XeServiceProxy, Group4XeDto} from '@shared/service-proxies/service-proxies';
import { environment } from 'environments/environment';
import { Table } from "primeng/components/table/table";
import { Paginator, SelectItem } from "primeng/primeng";
import * as moment from 'moment';
import { Console } from 'console';


@Component({
    selector: 'app-maintain-cars-notify-propose',
    templateUrl: './maintain-cars-notify-propose.component.html',
    styleUrls: ['./maintain-cars-notify-propose.component.css', '../../style.less']
})
export class MaintainCarsNotifyProposeComponent extends AppComponentBase implements OnInit, AfterViewInit {

    constructor(injector: Injector, private group9BaoTriService: Group9BaoTriServiceProxy,
        private group4XeService: Group4XeServiceProxy,) {
        super(injector);
        this.group9BaoTriService.getCurrentUserName().subscribe(response=>{
          this.currentUserName = response;
        })
        this.group4XeService.xE_Group4Search({} as any).subscribe(response=>{
            this.xe_list = response;
        })
        console.log(this);
    }

    currentUserName: string
    maxe: number;
    mataixe: number;
    ghichu: string;
    nguoigui: string;
    selectedLevel:number;
    selectedLevel2:number;
    luudialog: boolean;
    curMaBaoTri: number;

    filterInput: Group9BaoTriDto = new Group9BaoTriDto();
    records: Group9BaoTriDto[] = [];
    group9BaoTriInput: Group9BaoTriDto = new Group9BaoTriDto();
    currentId: number;
    saving = false;
    carManufacturerOpt: object = {};
    xe_list : Group4XeDto[];


    ngAfterViewInit(): void {
        throw new Error("Method not implemented.");
    }



    getValue() {
        this.group9BaoTriInput.baoTri_MaBaoTri = null;
        this.group9BaoTriInput.baoTri_MaXe = this.maxe;
        this.group9BaoTriInput.baoTri_TinhTrangBaoTri = "C";
        this.group9BaoTriInput.baoTri_NoiBaoTri = null;
        this.group9BaoTriInput.baoTri_NgayDuyet = null;
        this.group9BaoTriInput.baoTri_NgayXuatXuong = null;
        this.group9BaoTriInput.baoTri_TrangThai = "U";
        this.group9BaoTriInput.baoTri_ThanhTien = null;
        this.group9BaoTriInput.baoTri_MaTaiXe = null;
        this.group9BaoTriInput.baoTri_MaNguoiGui = this.currentUserName; 
        this.group9BaoTriInput.baoTri_NguoiTao = this.currentUserName;
        this.group9BaoTriInput.baoTri_NgayTao = null;
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

    add() {
        this.getValue();
      

        this.group9BaoTriService.bAOTRI_Group9Insert(this.group9BaoTriInput).subscribe((response) => {
            if (response["Result"] == "1") {
                this.notify.error("Thêm đề xuất thất bại", "ERROR", environment.opt);
                this.huyconfirm();
            } else {
                this.notify.info("Thêm đề xuất thành công", "SUCCESS", environment.opt);
            }
        });
        this.notify.info("Thêm tỳhgfhgfgfhgfhg", "SUCCESS", environment.opt);
    }

    insert(): void{
    this.getValue();
    this.group9BaoTriService.bAOTRI_Group9Insert(this.group9BaoTriInput).subscribe((response) => {
      if (response["Result"] == "1") {
          this.notify.error(response["ErrorDesc"],"ERROR", environment.opt);
      } else {
          this.notify.success("Thêm xe thành công","SUCCESS", environment.opt);
      }
  });
  }

    checkvalue(): boolean {
        if (this.maxe == null) {
            this.notify.error("Bạn chưa nhập mã xe", "ERROR", environment.opt);
            return false;
        }
        else if (this.ghichu == null || this.ghichu == '') {
            this.notify.error("Bạn chưa nhập ghi chú", "ERROR", environment.opt);
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
        this.ghichu = null;
    }

    ngOnInit() {
    }
    search() {
        // show loading trong gridview
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
    selectOption1(id: number) {
        //getted from event
        console.log(id);
        //getted from binding
        console.log(this.selectedLevel)
    
        this.search()
    
      }
      selectOption2(id: number) {
        //getted from event
        console.log(id);
        //getted from binding
        console.log(this.selectedLevel)
    
        this.search()
    
      }
}
