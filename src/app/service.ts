import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./model/User";

@Injectable()
export class Service1 {

    constructor(private http: HttpClient) { }

    loginUsuario(usuario: User) {
        let server = "https://cristiancarrenavarro.000webhostapp.com?email="+usuario.email+"&pass="+usuario.pass;
        return this.http.get(server, { headers: this.createRequestHeader() });
    }

    registrarUsuario(usuario: User) {
        let server = "https://cristiancarrenavarro.000webhostapp.com";
        return this.http.post(server, usuario, { headers: this.createRequestHeader() });
    }
   
    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
        });
        return headers;
    }
    resetPassword(usuario) {
        let server = "https://cristiancarrenavarro.000webhostapp.com";
        return this.http.post(server, usuario, { headers: this.createRequestHeader() });
        
    }
  
    /*
    private createRequestHeader() {
        let headers = new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token", "Content-Type": "application/json",
        }); return headers;
    }*/
}