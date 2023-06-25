import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { UsersFormComponent } from './admin/users-form/users-form.component';
import { UsersComponent } from './users/users.component';
import { ProductlistComponent } from './admin/productlist/productlist.component';
import { UserlistComponent } from './admin/userlist/userlist.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthgaurdGuard } from './authgaurd.guard';
import { ChatBoxComponent } from './chatbox/chat-box/chat-box.component';
import { CreatChatBoxComponent } from './chatbox/creat-chat-box/creat-chat-box.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:'full'},
  {path:"login", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent,  canActivate:[AuthgaurdGuard]},
  {path:"products", component:ProductsComponent,  canActivate:[AuthgaurdGuard]},
  {path:"users", component:UsersComponent, canActivate:[AuthgaurdGuard]},
  {path:"productsform", component:ProductsFormComponent,  canActivate:[AuthgaurdGuard]},
  {path:"usersform", component:UsersFormComponent,  canActivate:[AuthgaurdGuard]},
  {path:"productlist", component:ProductlistComponent,  canActivate:[AuthgaurdGuard]},
  {path:"userlist", component:UserlistComponent,  canActivate:[AuthgaurdGuard]},
  {path:"createchatbox", component:CreatChatBoxComponent,  canActivate:[AuthgaurdGuard]},
  {path:"chatbox", component:ChatBoxComponent,  canActivate:[AuthgaurdGuard]}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
