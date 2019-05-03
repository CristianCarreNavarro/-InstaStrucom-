import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';


@Component({
  selector: 'ns-test',
  templateUrl: './showImages.component.html',
  styleUrls: ['./showImages.component.css'],
  moduleId: module.id,
})


export class ShowImages implements OnInit {
 
  constructor(private service: Service1) {
  
  }

  ngOnInit() {


  }



}