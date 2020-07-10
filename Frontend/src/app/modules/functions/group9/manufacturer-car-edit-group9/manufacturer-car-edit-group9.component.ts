import { environment } from '../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector, inject} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";


@Component({
    selector: 'app-manufacturer-car-edit-group9',
    templateUrl: './manufacturer-car-edit-group9.component.html',
    styleUrls: ['./manufacturer-car-edit-group9.component.css', '../../style.less']
})


export class ManufacturerCarEditComponentGroup9 extends AppComponentBase implements OnInit, AfterViewInit {
    /**
     *
     */
    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    
    /**
     *
     */
    constructor(injector : Injector) {
        super(injector);
        
    }
  
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
    }
}
