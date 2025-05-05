import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports:[LoadingComponent]
})
export class SharedModule { }
