import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiserviceService} from '../apiservice.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
data: any;

  constructor(private api_service:ApiserviceService,
    private Router:Router
    ) {
      
     }

  ngOnInit() {
  }

  login(username,password): void{
    
 if(username==undefined)
   {
     alert("Please enter username");
     }
   
   else if(password==undefined)
   {
     alert("Please enter password");
     }
   else 
   {

   

    this.api_service.login(username,password) 
    .subscribe((data: Observable<any>) =>{ this.data=data;
     
       if(this.data.user.firstName==="Mayank98" && this.data.user.password==="123456789"){

            this.Router.navigate(['/view-rec']);
      }
    
  
     
   else if(this.data.token){
      
      localStorage.setItem('token', this.data.token);
      

      
      this.api_service.afterLogin(this.data.token)
      .subscribe((data: Observable<any>) =>{ this.data=data;
        this.Router.navigate(['/after-login']);


      });
      

   }
   
    
   else
    {
     alert("The Username or Password is incorrect!");
    }

    
    
    });
    
  
     
    
    }
    
  }
}
