import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Group9BaoTriServiceProxy, Group9BaoTriDto } from '@shared/service-proxies/service-proxies';
import { environment } from 'environments/environment';
import * as moment from 'moment';


@Component({
    selector: 'app-maintain-cars-notify-edit',
    templateUrl: './maintain-cars-notify-edit.component.html',
    styleUrls: ['./maintain-cars-notify-edit.component.css', '../../style.less']
})
export class MaintainCarsNotifyEditComponent extends AppComponentBase implements OnInit, AfterViewInit {

    constructor(injector: Injector, private group9BaoTriService: Group9BaoTriServiceProxy) {
        super(injector);
        
        this.group9BaoTriService.getCurrentUserName().subscribe(response=>{
          this.currentUserName = response;
        })
        this.group9BaoTriInput.ma = this.getRouteParam("id");
        this.group9BaoTriService.bAOTRI_Group9ById(this.group9BaoTriInput.ma).subscribe(response=>{
            this.group9BaoTriInput = response;            
            this.load();
          })
    }

    currentUserName:string;
    maxe: number;
    mataixe: number;
    tinhtrang: string;
    ngayduyet: string;
    ngaybaotri: string;
    ngaytao: Date;
    ngayxuatxuong: Date;
    nguoitao: string;
    trangthai: string;
    thanhtien: string;
    noibaotri: string;
    ghichu: string;

    luudialog: boolean;

    filterInput: Group9BaoTriDto = new Group9BaoTriDto();
    records: Group9BaoTriDto[] = [];
    group9BaoTriInput: Group9BaoTriDto = new Group9BaoTriDto();
    currentId: number;
    saving = false;


    ngAfterViewInit(): void {
        throw new Error("Method not implemented.");
    }

    getValue() {
        this.group9BaoTriInput.baoTri_MaXe = this.maxe;
        this.group9BaoTriInput.baoTri_MaTaiXe = this.mataixe;
        this.group9BaoTriInput.baoTri_TinhTrangBaoTri = this.tinhtrang;
        this.group9BaoTriInput.baoTri_NgayBaotri= moment(this.ngaybaotri, 'YYYY-MM-DD');
        this.group9BaoTriInput.baoTri_NgayDuyet = moment(this.ngayduyet);
        this.group9BaoTriInput.baoTri_NgayTao = moment(this.ngaytao);
        this.group9BaoTriInput.baoTri_NgayXuatXuong = moment(this.ngayxuatxuong);
        this.group9BaoTriInput.baoTri_NguoiTao = this.currentUserName;
        this.group9BaoTriInput.baoTri_TrangThai = this.trangthai;
        this.group9BaoTriInput.baoTri_ThanhTien = parseInt(this.thanhtien.split(',').join(""));
        this.group9BaoTriInput.baoTri_NoiBaoTri = this.noibaotri;
        this.group9BaoTriInput.baoTri_GhiChu = this.ghichu;
        this.group9BaoTriInput.baoTri_NguoiTao = this.nguoitao;
        //console.log(`[getValue] loainhienlieu: ${this.loainhienlieu}`);
    }

    load(){

        this.maxe = this.group9BaoTriInput.baoTri_MaXe;
        this.notify.error(this.maxe.toString(), "ERROR", environment.opt);

        this.mataixe=this.group9BaoTriInput.baoTri_MaTaiXe;
        this.tinhtrang=this.group9BaoTriInput.baoTri_TinhTrangBaoTri;
        this.ngaybaotri=this.group9BaoTriInput.baoTri_NgayBaotri.format("DD/MM/YYYY");
        this.ngaytao =this.group9BaoTriInput.baoTri_NgayTao.toDate();
        this.ngayxuatxuong=this.group9BaoTriInput.baoTri_NgayXuatXuong.toDate();
        this.currentUserName=this.group9BaoTriInput.baoTri_NguoiTao;
        this.trangthai=this.group9BaoTriInput.baoTri_TrangThai ;
        this.thanhtien=this.group9BaoTriInput.baoTri_ThanhTien.toString() ;
        this.noibaotri=this.group9BaoTriInput.baoTri_NoiBaoTri;
        this.ghichu=this.group9BaoTriInput.baoTri_GhiChu ;
        this.nguoitao=this.group9BaoTriInput.baoTri_NguoiTao ;

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

  

    

    luuconfirm() {
        if (this.checkvalue() == true) {
            this.luudialog = true;
        }
    }

    huyconfirm() {
        this.maxe = null;
        this.tinhtrang = null;
        this.ngayduyet = null;
        this.ngayxuatxuong = null;
        this.noibaotri = null;
        this.thanhtien = null;
        this.ghichu = null;
        this.nguoitao = null;
    }

    ngOnInit() {
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }

      update(): void{
        this.group9BaoTriService.bAOTRI_Group9ById(this.group9BaoTriInput.ma).subscribe((response) => {
          if (response["Result"] === "1") {
          } else {
              if(response.baoTri_MaNguoiGui !== this.currentUserName)
              {
                  this.notify.error("Chỉ có người mang đi bảo trì mới được phép cập nhật", "ERROR", environment.opt);
                   return ;
              }        if(!this.checkvalue())
                return;
                this.getValue();
                this.group9BaoTriService.bAOTRI_Group9Update(this.group9BaoTriInput).subscribe((response) => {
                  if (response["Result"] == "1") {
                      this.notify.error(response["ErrorDesc"],"ERROR", environment.opt);
                  } else {
                      this.notify.success("Sửa xe thành công","SUCCESS", environment.opt);
                  }
              });
          }
      });
  
      }
      checkvalue(): boolean{
      
      
         if(this.ngayxuatxuong==null){
          this.notify.error("Ngày xuất xưởng", "ERROR", environment.opt);
          return false;
        }
        else if(this.noibaotri==null || this.noibaotri ==""){
            this.notify.error("Nơi bảo trì", "ERROR", environment.opt);
            return false;
          }
        else if(this.thanhtien==null|| this.thanhtien ==""){
            this.notify.error("Thành tiền", "ERROR", environment.opt);
            return false;
          }
        else if (moment(this.ngaybaotri, 'YYYY-MM-DD') > moment(this.ngayxuatxuong, 'YYYY-MM-DD')){
          this.notify.error("Ngày xuất xưởng không được trước ngày bảo trì", "ERROR", environment.opt);
            return false;
        }
      
        return true;
      }

}
