import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';
import { User } from '../model/User';
import * as localStorage from 'nativescript-localstorage';
import { alert, prompt } from "tns-core-modules/ui/dialogs";


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
    let user = new User("", this.pass, this.email);
    console.log(this.pass + this.email);
    this.service.loginUsuario(user).subscribe(
      (respuesta) => {

        if (respuesta["code"] === 1) {

          console.log("ok -> " + respuesta["token"]);
          localStorage.setItem("key", respuesta["token"]);
          console.log(localStorage.getItem("key"));

        } else {
          //"poner un toast en el movil"
          console.log("error de login")
        }
      }, (error: any) => {
        console.log("error de server")
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




