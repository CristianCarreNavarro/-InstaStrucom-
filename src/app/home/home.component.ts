import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';
import { User } from '../model/User';
import * as Camera from "nativescript-camera";
import * as Permissions from "nativescript-permissions";
import { ImageSource, fromFile, fromResource, fromBase64, fromAsset } from "tns-core-modules/image-source";
import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Imagen } from '../model/Imagen';
import { endTimeRange } from '@angular/core/src/profile/wtf_impl';
import { knownFolders } from 'tns-core-modules/file-system/file-system';


declare var android: any;
let viewModel: Observable;
let items: [String];


@Component({
  selector: 'ns-test',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})


export class HomeComponent implements OnInit {
  email: string;
  pass: string;
  items: ObservableArray<any>;
  public imagen: Imagen = new Imagen();
  nomFormRegister: string;
  emailFormRegister: string;
  passFormRegister: string;
  passFormRegister2: string;

  public picture: any;
  public base64: any
  public imageAsset: any
  public etiqueta: string;
  public coordenadas: string;
  constructor(private service: Service1) {
    this.picture = "https://placehold.it/200x200";
  }

  ngOnInit() {
 //   this.items = new ObservableArray();

   // for (let loop = 0; loop < 200; loop++) {
  //    this.items.push({ value: "items " + loop.toString() });
  //  }
  console.log(this.imagen)
  }

  /** pageLoaded(args: EventData) {
    const page = args.object as Page;
    this.items = new ObservableArray();

    for (let loop = 0; loop < 200; loop++) {
      this.items.push({ value: "test" + loop.toString() });
    }
    viewModel = new Observable();
    viewModel.set("items", items);
    page.bindingContext = viewModel;
  }*/

  public getCameraPermission() {
    
    Permissions.requestPermission(android.Manifest.permission.CAMERA, "Needed for connectivity status").then(() => {
      console.log("Permission granted!");

      Camera.takePicture().then(picture => {
        this.picture = picture;

        this.imgAssetToBase64(picture).then(	
          (imgString64)=>{ 
             console.log("imgString64: "+imgString64) 
             this.imagen.base64 =imgString64;
            } //El podem passar a S64 per pujar al server
        ).catch(err=>{ console.log(err)});
    
      }).catch((err) => {
        console.log("Error to convert.->" + err.message);
      })
    }).catch(() => {

      console.log("Permission is not granted (sadface)");
    });
  }

subirFoto(){
this.imagen.coordenadas="coordenada51ycoordenada214";

  this.service.enviar64(this.imagen).subscribe(
    (respuesta) => {
      console.log("RESPUESTA");
      console.log(respuesta);
      if (respuesta["code"] === 1) {

        console.log("funciona")
        console.log(respuesta["creador"])

      } else {
        //"poner un toast en el movil"
        console.log("error to send image64")
      
      }
    }, (error) => {
      console.log("ERROR?!");  
       console.log(error);   }



  );}

  getEtiqueta(): any {
    prompt({
      title: "Etiqueta",
      message: "Enter your description.",
      inputType: "text",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      this.alert("ok, with your ETTIQUETE");
      return data
    }).catch(() => {
      this.alert("Unfortunately, with your ETTIQUETE");
    });
  }

  alert(message: string) {
    return alert({
      title: "STRUCOM",
      okButtonText: "OK",
      message: message
    });
  }


  imgAssetToBase64(imageAsset) {
    return new Promise((resolve, reject) => {
      const source = new ImageSource();
      source.fromAsset(imageAsset).then((imageSource: ImageSource) => {
        const folderPath: string = knownFolders.documents().path;
        let string = imageSource.toBase64String("jpg",100);
      resolve(string);
      }).catch((e) => {  console.log(e);  reject("Error fromAsset:"); });
  });   };
  

}