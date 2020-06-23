import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Group5XeServiceProxy, Group5DeXuatDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-dx-car-management-group5',
  templateUrl: './dx-car-management-group5.component.html',
  styleUrls: ['./dx-car-management-group5.component.css', '../../style.less']
})
export class DxCarManagementGroup5Component extends AppComponentBase implements OnInit {

  currentUserName: string;

  dxCars: Group5DeXuatDto[] = [];

  constructor(injector: Injector, private group5: Group5XeServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.getListDX();
  }

  getListDX() {
    this.group5.dEXUAT_Group5DisplaySuggestions().subscribe(
      response => {
        if (response["Result"] === "-1") {
          this.notify.error(response["ErrorDesc"]);
        } else {

          this.dxCars = response;

          this.primengTableHelper.totalRecordsCount = response.length;
          this.primengTableHelper.records = response;
          this.primengTableHelper.hideLoadingIndicator();

          console.log(this.dxCars);
        }
      }
    )
  }

  search() {

  }

}
