import { NgModule } from "@angular/core";

import {
    MenuClientServiceProxy,
    DemoModelServiceProxy,
} from "@shared/service-proxies/service-proxies";

import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ModulesRoutingModule } from "./modules-routing.module";
import { ModulesServiceProxyModule } from "./modules.service-proxy.module";
import { CarsModule } from './cars/cars.module';
import { ModelCarsModule } from './model-cars/model-cars.module';
import { NewCarsModule } from './new-cars/new-cars.module';
import { RouterModule } from "@angular/router";
import { FunctionsModule } from './functions/functions.module';
import { MaintainCarsModule} from './maintain-cars/maintain-cars.module'
import { MaintainCarNotifyModule} from './maintain-car-notify/maintain-car-notify.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        CalendarModule,
        CheckboxModule,
        ConfirmDialogModule,
        ModulesRoutingModule,
        ModulesServiceProxyModule,
        CarsModule,
        ModelCarsModule,
        NewCarsModule,
        RouterModule,
        FunctionsModule,
        MaintainCarsModule,
        MaintainCarNotifyModule
    ],
    declarations: [ 
    ],
    providers: [ConfirmationService]
})
export class ModulesModule { }
