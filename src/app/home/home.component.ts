import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service';


@Component({
  selector: 'ns-test',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})


export class HomeComponent implements OnInit {
 
  constructor(private service: Service1) {
  
  }

  ngOnInit() {


  }



}