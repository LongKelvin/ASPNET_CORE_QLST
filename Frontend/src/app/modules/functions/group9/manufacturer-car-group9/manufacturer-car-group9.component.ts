import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';


@Component({
    selector: 'app-manufacturer-car-group9',
    templateUrl: './manufacturer-car-group9.component.html',
    styleUrls: ['./manufacturer-car-group9.component.css', '../../style.less']
})


export class ManufacturerCarComponentGroup9 extends AppComponentBase implements OnInit, AfterViewInit {
 
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
