import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { Service1 } from "./service";
import { LoginComponent } from "./login/test.component";
import { RegisterComponent } from "./login/register.component";
import { HomeComponent } from "./home/home.component";
import { TakePicture } from "./takePicture/takePicture.component";
import { ShowImages } from "./showImages/showImages.component";
import { CollectionViewModule } from 'nativescript-collectionview/angular';
import { GifModule } from 'tns-ng-gif';
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        CollectionViewModule,
        GifModule
      
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        TakePicture,
        ShowImages
    ],
    providers: [Service1],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
