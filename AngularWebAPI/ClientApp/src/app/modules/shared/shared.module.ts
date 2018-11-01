import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenteredFormContainerComponent } from './components/centered-form-container/centered-form-container.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagerComponent } from './components/pager/pager.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [CenteredFormContainerComponent, FormContainerComponent, PagerComponent],
  exports: [CenteredFormContainerComponent, FormContainerComponent, PagerComponent, ReactiveFormsModule]
})
export class SharedModule { }
