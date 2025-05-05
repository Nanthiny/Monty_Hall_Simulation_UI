import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { SimulationFormComponent } from '../components/simulation-form/simulation-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    SimulationFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    InputTextModule,
    ChartModule,
    CheckboxModule,
    ToastModule,
    SharedModule
  ]
})
export class HomeModule { }
