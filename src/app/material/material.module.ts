import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTable, MatTableModule} from "@angular/material/table";

const MaterialComponents = [
  MatButtonModule,MatToolbarModule,MatStepperModule,MatSidenavModule,MatListModule,MatIconModule,
  MatCardModule,MatTabsModule,MatFormFieldModule,MatDatepickerModule,MatRadioModule, MatInputModule,
  MatDialogModule,MatDividerModule,MatTableModule
]

@NgModule({

  imports: [MaterialComponents,CommonModule

  ],
  exports: [MaterialComponents

  ]
})
export class MaterialModule { }