import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
data:any;

  constructor(private api_service:ApiserviceService) {
    
   }

  ngOnInit() {
  }
  
 showlist(username,password): void
 {
   if(username==undefined)
   {
     alert("Please enter username");
     password=undefined;
     
     
   }
   else if(password==undefined)
   {
     alert("Please enter password");
     username=undefined;
   }
   


   this.api_service.showlist(username,password)
   .subscribe((data: Observable<any>) =>{ this.data=data;console.log(this.data);alert("You have succesfully registered")});


  }

}
  

