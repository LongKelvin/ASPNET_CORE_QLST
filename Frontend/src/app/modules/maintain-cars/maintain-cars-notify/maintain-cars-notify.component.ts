import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";

@Component({
    selector: 'app-maintain-cars-notify',
    templateUrl: './maintain-cars-notify.component.html',
    styleUrls: ['./maintain-cars-notify.component.less']
})
export class MaintainCarsNotifyComponent extends AppComponentBase implements OnInit {

    constructor(injector: Injector) {
    super(injector);
  }
    ngOnInit() {
    }

    ngAfterViewInit(): void {
  }
}

