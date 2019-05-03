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
import { knownFolders } from 'tns-core-modules/file-system/file-system';


declare var android: any;
let viewModel: Observable;
let items: [String];


@Component({
  selector: 'ns-test',
  templateUrl: './takePicture.component.html',
  styleUrls: ['./takePicture.component.css'],
  moduleId: module.id,
})


export class TakePicture implements OnInit {
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
  this.picture = "https://www.gannett-cdn.com/presto/2018/10/04/USAT/151650f6-fe1d-4dfa-886f-36c485ee9148-selfie.jpg?crop=4480,4480,x525,y0&width=200&height=200&fit=bounds";
  }

  ngOnInit() {

  console.log(this.imagen)
  }


  public getCameraPermission() {
    
    Permissions.requestPermission(android.Manifest.permission.CAMERA, "Needed for connectivity status").then(() => {
      console.log("Permission granted!");

      Camera.takePicture().then(picture => {
        this.picture = picture;

        this.imgAssetToBase64(picture).then(	
          (imgString64)=>{ 
             console.log("imgString64: "+imgString64) 
             this.imagen.base64 =imgString64;
            } 
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