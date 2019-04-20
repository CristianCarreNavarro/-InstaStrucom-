export class User {
 public   nombre: string;
 public   email: string;
 public    pass: string;
  

    constructor(nombre:string="", pass="",email:string=""){
        this.nombre = nombre;
        this.email = email;
        this.pass = pass;
   
    }



}