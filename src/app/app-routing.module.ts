import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/test.component";
import { RegisterComponent } from "./login/register.component";
import { HomeComponent } from "./home/home.component";
import { TakePicture } from "./takePicture/takePicture.component";
import { ShowImages } from "./showImages/showImages.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "takePicture", component: TakePicture },
    { path: "showImages", component: ShowImages },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
