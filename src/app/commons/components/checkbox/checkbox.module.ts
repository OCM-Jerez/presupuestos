import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox.component';

@NgModule({
    exports: [
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CheckboxComponent,
    ]
})
export class CheckboxModule { }
