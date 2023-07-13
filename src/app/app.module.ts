import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from './service/apiservice.service';
import { FilterPipe } from './filter.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CartserviceService } from './service/cartservice.service';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { UsersFormComponent } from './admin/users-form/users-form.component';
import { UsersComponent } from './users/users.component';
import { ProductlistComponent } from './admin/productlist/productlist.component';
import { UserlistComponent } from './admin/userlist/userlist.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { InterceptorsService } from './service/interceptors.service';
import { AuthgaurdGuard } from './authgaurd.guard';
import { CreatChatBoxComponent } from './chatbox/creat-chat-box/creat-chat-box.component';
import { ChatBoxComponent } from './chatbox/chat-box/chat-box.component';
import { ChatserveService } from './service/chatserve.service';
import { ChatUsersComponent } from './chatbox/chat-users/chat-users.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CompressImageService } from './service/comptressImageService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule} from '@angular/cdk/dialog';
import { AddUsersComponent } from './models/add-users/add-users.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GrpmembersComponent } from './models/grpmembers/grpmembers.component';
import { ViewimageComponent } from './models/viewimage/viewimage.component';
import { ScrollBottomDirective } from './scroll-bottom.directive';
import { HashLocationStrategy,Location, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    FilterPipe,
    ProductsFormComponent,
    UsersFormComponent,
    UsersComponent,
    ProductlistComponent,
    UserlistComponent,
    DashboardComponent,
    LoginComponent,
    CreatChatBoxComponent,
    ChatBoxComponent,
    ChatUsersComponent,
    AddUsersComponent,
    GrpmembersComponent,
    ViewimageComponent,
    ScrollBottomDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    PickerModule,
    NgbModule,
    BrowserAnimationsModule,
    DialogModule,
    MatSelectModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot()


  ],
  providers: [Location,{provide: LocationStrategy, useClass: HashLocationStrategy},{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},ApiserviceService,    CompressImageService,
    CartserviceService,ChatserveService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true }, AuthgaurdGuard],
  bootstrap: [AppComponent],
  exports: [
    ScrollBottomDirective
  ]
})
export class AppModule { }
