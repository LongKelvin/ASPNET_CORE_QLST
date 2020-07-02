import { environment } from './../../../../../environments/environment.prod';
import { Component,ViewChild, OnInit,AfterViewInit,Injector} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";


@Component({
    selector: 'app-driver-schedule-group9',
    templateUrl: './driver-schedule.component.html',
    styleUrls: ['./driver-schedule.component.less', '../../style.less']
})
export class DriverScheduleComponent extends AppComponentBase implements OnInit, AfterViewInit {

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

    // Constants

    DRIVER_ID: string = "driverID"
    START_DATE: number = Date.now();
    END_DATE: number = Date.now() + 7;

    // function
    search() { }
    filterDriverId(){}
    clearOption(){}
    validateFilterInput(){}
    onKeyUp(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }
                                  

}
