import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { DataTablesModule } from "angular-datatables";
// import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { AppComponent } from "./app.component";
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SingupComponent } from "./admin/singup/singup.component";
import { UsersdetailComponent } from "./admin/usersdetail/usersdetail.component";
import { InventoryComponent } from './admin/inventory/inventory.component';
import { SalesComponent } from './admin/sales/sales.component';






const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'signup', component: SingupComponent },
      { path: 'userdetail', component: UsersdetailComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'sales', component: SalesComponent },
    ],
  },
];

@NgModule({
  declarations: [AppComponent, AdminComponent, HomeComponent, SingupComponent,
    UsersdetailComponent,
    InventoryComponent,
    SalesComponent,],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    DataTablesModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
export class AppBootstrapModule {}
