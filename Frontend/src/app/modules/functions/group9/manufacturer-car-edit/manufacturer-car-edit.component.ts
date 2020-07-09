import { environment } from '../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector, inject} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";


@Component({
    selector: 'app-manufacturer-car-add-group9',
    templateUrl: './manufacturer-car-edit.component.html',
    styleUrls: ['./manufacturer-car-edit.component.css', '../../style.less']
})


export class ManufacturerCarEditComponent extends AppComponentBase implements OnInit, AfterViewInit {
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
