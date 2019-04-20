import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';
import { User } from '../model/User';
import * as localStorage from 'nativescript-localstorage';
import { alert, prompt } from "tns-core-modules/ui/dialogs";


@Component({
  selector: 'ns-test',
  templateUrl: './register.component.html',
  styleUrls: ['./test.component.css'],
  moduleId: module.id,
})

export class RegisterComponent implements OnInit {
  email: string;
  pass: string;

  nomFormRegister: string;
  emailFormRegister: string;
  passFormRegister: string;
  passFormRegister2: string;

  constructor(private service: Service1) { }

  ngOnInit() {
  }

  registro() {
    if (this.nomFormRegister != null || this.emailFormRegister != null || this.passFormRegister != null || this.passFormRegister2 != null) {
      if (this.passFormRegister === this.passFormRegister2) {
        let user = new User(this.nomFormRegister, this.passFormRegister, this.emailFormRegister);


        this.service.registrarUsuario(user).subscribe(
          (respuesta) => {

            if (respuesta["code"] === 1) {
              this.alert("¡Felicidades! Registrado correctamente. ");
              console.log("funciona");
            } else {
              this.alert("Error de registro");
              console.log("error de registro")
            }
          }, (error: any) => {
            this.alert("Error de server");
            console.log("error de server")
          }
        );
      } else {
        this.alert("Error de password no coinciden");
        console.log("error de password no coinciden")
      }
    } else {
      this.alert("Error de campos sin rellenar");
      console.log("error de campos vacios")
    }

  }


  alert(message: string) {
    return alert({
      title: "STRUCOM",
      okButtonText: "OK",
      message: message
    });
  }
}




