import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModelCarManagementGroup4Component } from './model-car-management-group4/model-car-management-group4.component';
import { Group4ServiceProxyModule } from "./group4.service-proxy.module";
import { TableModule } from "primeng/table";
import { AutoCompleteModule } from 'primeng/primeng';
import { UtilsModule } from "@shared/utils/utils.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        RouterModule,
        UtilsModule,
        AutoCompleteModule,
        Group4ServiceProxyModule
    ],
    declarations: [ModelCarManagementGroup4Component],
    exports: [ModelCarManagementGroup4Component]
})
export class Group4Module { }
