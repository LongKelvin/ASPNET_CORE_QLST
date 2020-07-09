import { environment } from '../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector, inject} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import { Group9BaoTriServiceProxy, Group9BaoTriDto, Group4XeDto, Group4XeServiceProxy, Group10ServiceProxy, Group4LichTrinhServiceProxy } from '@shared/service-proxies/service-proxies';
import {
    Group4LoaiXeDto,
    Group4LoaiXeServiceProxy,
    
} from "@shared/service-proxies/service-proxies";


@Component({
    selector: 'app-manufacturer-car-group9',
    templateUrl: './manufacturer-car.component.html',
    styleUrls: ['./manufacturer-car.component.css', '../../style.less']
})


export class ManufacturerCarComponent extends AppComponentBase implements OnInit, AfterViewInit {
    /**
     *
     */
    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
  
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngAfterViewInit(): void {
        throw new Error("Method not implemented.");
    }
}
