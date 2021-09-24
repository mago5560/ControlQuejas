import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';


@NgModule({
    declarations: [],
    imports: [MatListModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,MatTableModule,MatMenuModule,MatDividerModule,MatSlideToggleModule,MatSidenavModule,MatSnackBarModule,MatSelectModule,MatInputModule,MatCardModule,MatIconModule,MatToolbarModule],
    exports: [MatListModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,MatTableModule,MatMenuModule,MatDividerModule,MatSlideToggleModule,MatSidenavModule,MatSnackBarModule,MatSelectModule,MatInputModule,MatCardModule,MatIconModule,MatToolbarModule]
})

export class MaterialModule { }
