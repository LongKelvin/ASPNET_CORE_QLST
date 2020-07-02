import { environment } from './../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";


@Component({
    selector: 'app-driver-schedule-edit-group9',
    templateUrl: './driver-schedule-edit.component.html',
    styleUrls: ['./driver-schedule-edit.component.less', '../../style.less']
})
export class DriverScheduleEditComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;

    constructor(injector: Injector, ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    currentUserName: string;

    ngOnInit() {
    }
    
    ngAfterViewInit(): void {
       
    }
}
