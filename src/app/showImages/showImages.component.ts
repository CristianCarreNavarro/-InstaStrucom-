import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';
import { Imagen } from '../model/Imagen';


@Component({
  selector: 'ns-test',
  templateUrl: './showImages.component.html',
  styleUrls: ['./showImages.component.css'],
  moduleId: module.id,
})


export class ShowImages implements OnInit {

  fotos:string[] = [];

  constructor(private service: Service1) {
  
  }

  ngOnInit() {
    console.log("Entra");
    this.service.getFoto().subscribe( (resp) => {
      console.log("ok");
      console.log(resp);
      
      this.fotos=resp["fotos"];
      console.log(this.fotos);
      
    }, (err) => {
      console.log("mal");
      console.log(err);
      console.log(err.message);
    });

  }



}