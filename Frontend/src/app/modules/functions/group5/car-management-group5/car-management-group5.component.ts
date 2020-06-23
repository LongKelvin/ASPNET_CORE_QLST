import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { environment } from 'environments/environment';
import { Table } from "primeng/components/table/table";
import { Paginator, SelectItem } from "primeng/primeng";
import { Group5XeServiceProxy, Group5XeDto } from '@shared/service-proxies/service-proxies';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-management-group5',
  templateUrl: './car-management-group5.component.html',
  styleUrls: ['./car-management-group5.component.css', '../../style.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarManagementGroup5Component extends AppComponentBase implements OnInit {

  currentId: number;
  cars: Group5XeDto[] = [];
  currentUserName: string;

  formSearch: FormGroup;
  submitted = false;

  @ViewChild("dataTable") dataTable: Table;
  @ViewChild("paginator") paginator: Paginator;

  constructor(injector: Injector, private group5Proxy: Group5XeServiceProxy, private formBuilder: FormBuilder) {
    super(injector);
    this.currentUserName = this.appSession.user.userName;
  }

  ngOnInit() {
    this.getListCar();

    this.formSearch = this.formBuilder.group({
      id: [''],
      carNumber: ['', Validators.pattern(/^([0-9]){2} + ([A-Z]){1,2} + - + ([0-9]){4,5}$/)],
      type: [''],
      brand: ['']
    });
  }

  get f() { return this.formSearch.controls; }

  getListCar() {
    this.group5Proxy.xe_Group5DisplayVehicles().subscribe(
      response => {
        if (response["Result"] === "-1") {
          this.notify.error(response["ErrorDesc"]);
        } else {

          this.cars = response;

          this.primengTableHelper.totalRecordsCount = response.length;
          this.primengTableHelper.records = response;
          this.primengTableHelper.hideLoadingIndicator();

          console.log(this.cars)
        }
      }
    );
  }

  search() {
    this.submitted = true;
    if (this.formSearch.invalid) {
      return;
    }

    if (this.formSearch.value.id === "" && this.formSearch.value.carNumber === ""
      && this.formSearch.value.type === ""
      && this.formSearch.value.brand === "") {
      this.getListCar();
      return;
    }

    this.group5Proxy.xE_Group5SearchById(this.formSearch.value.id).subscribe(
      response => {
        if (response["Result"] === "-1") {
          this.notify.error(response["ErrorDesc"]);
        } else {

          this.cars = [];

          this.cars.push(response)

          this.primengTableHelper.totalRecordsCount = 1;
          this.primengTableHelper.records = this.cars;
          this.primengTableHelper.hideLoadingIndicator();

          console.log(this.cars)
        }
      }
    )

  }


}
