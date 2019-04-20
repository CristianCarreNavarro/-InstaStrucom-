import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';
import { User } from '../model/User';
import * as localStorage from 'nativescript-localstorage';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import * as Camera from "nativescript-camera";
import * as Permissions from "nativescript-permissions";
import { ImageSource, fromFile, fromResource, fromBase64 } from "tns-core-modules/image-source";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { Folder, path, knownFolders } from "tns-core-modules/file-system";
import { CollectionViewModule } from "nativescript-collectionview/angular";
import { CollectionViewItemEventData } from "nativescript-collectionview";
import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";

declare var android: any;
let viewModel: Observable;


@Component({
  selector: 'ns-test',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})


export class HomeComponent implements OnInit {
  email: string;
  pass: string;

  nomFormRegister: string;
  emailFormRegister: string;
  passFormRegister: string;
  passFormRegister2: string;

  public picture: any;
  public base64: any
  public imageAsset: any

  constructor(private service: Service1) {
    this.picture = "https://placehold.it/200x200";
  }

  ngOnInit() {
  }
 
  pageLoaded(args: EventData) {
    const page = args.object as Page;
    const items = new ObservableArray();
 
    for (let loop = 0; loop < 200; loop++) {
        items.push({ value: "test " + loop.toString() });
    }
    viewModel = new Observable();
    viewModel.set("items", items);
 
    page.bindingContext = viewModel;
}

  public getCameraPermission() {
    Permissions.requestPermission(android.Manifest.permission.CAMERA, "Needed for connectivity status").then(() => {
      console.log("Permission granted!");

      Camera.takePicture().then(picture => {
        this.picture = picture;

        let source = new ImageSource();

        source.fromAsset(this.imageAsset).then((source) => {
          const base64image = source.toBase64String("png", 60);
          this.base64 = base64image;

          console.log(this.base64);
          const imageFromBase64 = fromBase64(this.base64);
          this.picture = imageFromBase64;
        });

      }).catch((err) => {
        console.log("Error to convert.->" + err.message);
      })
    }).catch(() => {

      console.log("Permission is not granted (sadface)");
    });
  }

}