import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';
import { User } from '../model/User';

import { alert, prompt } from "tns-core-modules/ui/dialogs";
import * as appSettings from "tns-core-modules/application-settings";


@Component({
  selector: 'ns-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {
  email: string;
  pass: string;

  emailFormRegister: string;
  passFormRegister: string;


  constructor(private service: Service1) { }

  ngOnInit() {
  }

  login() {
    let user = new User("", this.passFormRegister, this.emailFormRegister);
    console.log("LOGIN!");
    console.log(user);
    this.service.loginUsuario(user).subscribe(
      (respuesta) => {
        console.log(respuesta);
        if (respuesta["code"] === 1) { 

          console.log("ok -> " + respuesta["token"]);
          appSettings.setString("token", respuesta["token"]);
         
          console.log(appSettings.getString("token"));

        } else {
          //"poner un toast en el movil"
          console.log("error de login")
        }
      }, (error: any) => {
        console.log("error de server");
        console.log(error);
      }


    );
  }


  forgotPassword() {
    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for APP NAME to reset your password.",
      inputType: "email",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {
        this.service.resetPassword(data.text.trim())
          .toPromise()
          .then(() => {
            this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          }).catch(() => {
            this.alert("Unfortunately, an error occurred resetting your password.");
          });
      }
    });
  }

  alert(message: string) {
    return alert({
      title: "STRUCOM",
      okButtonText: "OK",
      message: message
    });
  }
}




