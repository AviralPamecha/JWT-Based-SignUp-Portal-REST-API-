import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { longStackSupport } from 'q';


@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.page.html',
  styleUrls: ['./after-login.page.scss'],
})
export class AfterLoginPage implements OnInit {
show=false;
  constructor(private api_service:ApiserviceService,
              private Router:Router      
    ) {
      this.token=localStorage.getItem('token');
     
      
      this.api_service.afterLogin(this.token)
        .subscribe((data: Observable<any>) =>{ this.data=data;
          
          if(this.data.isValid==="null")
          {
            this.Router.navigate(['/login']);
          }
          
        else
        {
        this.show = true;
        }
    });
    
     
     }
  token:any;
  data:any;
  username:any;
  ngOnInit() {

   
    this.token=localStorage.getItem('token');
    
    
    this.api_service.afterLogin(this.token)
      .subscribe((data: Observable<any>) =>{ this.data=data;
        
        if(this.data.isValid==="null")
        {
          console.log(this.data); 

          this.Router.navigate(['/login']);
        }
        else
        {
        this.show = true;

        }
  });


  
    
  this.api_service.list()
  .subscribe((data: Observable<any>) =>{ this.data=data;console.log(this.data);});

}
logout(): void {
  localStorage.removeItem('token');
  this.Router.navigate(['/login']);

 

}


 
}





