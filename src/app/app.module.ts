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
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,

  ],
  providers: [ApiserviceService, CartserviceService,ChatserveService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true }, AuthgaurdGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
