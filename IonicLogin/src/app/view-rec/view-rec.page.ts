import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";



@Component({
  selector: 'app-view-rec',
  templateUrl: './view-rec.page.html',
  styleUrls: ['./view-rec.page.scss'],
})
export class ViewRecPage implements OnInit {
data:any;
ho:any;
token: any;
username:any;

  



  constructor(private api_service:ApiserviceService,
    private Router:Router
    
    
    )
    
    {

      
     


      
this.api_service.list()
    .subscribe((data: Observable<any>) =>{ this.data=data;console.log(this.data);});
    }

    
   
  
  ngOnInit() {

   
    
    

  }

 

}
