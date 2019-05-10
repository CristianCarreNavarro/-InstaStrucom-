import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./model/User";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class Service1 {

    constructor(private http: HttpClient) { }

    loginUsuario(usuario: User) {
        let server = "https://cristiancarrenavarro.000webhostapp.com/?email="+usuario.email+"&pass="+usuario.pass;
        return this.http.get(server, { headers: this.createRequestHeader() });
    }

    registrarUsuario(usuario: User) {
        let server = "https://cristiancarrenavarro.000webhostapp.com";
        return this.http.post(server, usuario, { headers: this.createRequestHeader() });
    }
   
    private createRequestHeader() {
        // En el encabezado le pasamos el token
       
        if (appSettings.getString("token") ) {
            let token = appSettings.getString("token") ;
            console.log("TOKEN!!");
            console.log(token);
            return  new HttpHeaders({  'Content-Type': 'application/json','Authorization': token }) 
     } else { 
        console.log("NO TOKEN!!");
        return new HttpHeaders({ 'Content-Type': 'application/json' }) };   
  
    }
    resetPassword(usuario) {
        let server = "https://cristiancarrenavarro.000webhostapp.com";
        return this.http.post(server, usuario, { headers: this.createRequestHeader() });
        
    }
   getFoto() {
        let server = "https://cristiancarrenavarro.000webhostapp.com/getFoto.php";
        return this.http.get(server,  { headers: this.createRequestHeader() });
        
    }
    enviar64(base64image) {
        console.log("Upload base64:");
        console.log(base64image);
        let server = "https://cristiancarrenavarro.000webhostapp.com/postFoto.php";
        return this.http.post(server, base64image, { headers: this.createRequestHeader() });
        
    }
    /*
    private createRequestHeader() {
        let headers = new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token", "Content-Type": "application/json",
        }); return headers;
    }*/
}