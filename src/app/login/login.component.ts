import { Component, OnInit } from '@angular/core';
import { Router, UrlHandlingStrategy } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    localStorage.clear();

  }
  public onAdminLoginClick( username:any, password:any ){
    let data:User=new User;
    data.username=username.value;
    data.password=password.value;
    console.log(data);
    this.authService.adminLogIn(data)
    .subscribe((data: any) => {
          console.log(data);
          localStorage.setItem("token",data.token);
          this.router.navigate(['./admin']);
        },(error:any)=>{
          console.log(error);
          window.alert('Invalid Credentials');
        });
    
  
  
    
  }

  public onUserLoginClick( username:any, password:any ){
    let data:User=new User;
    data.username=username.value;
    data.password=password.value;
    console.log(data);
    this.authService.userLogIn(data)
    .subscribe((data: any) => {
          console.log(data);
          localStorage.setItem("token",data.token);
          this.router.navigate(['./user']);
        },(error:any)=>{
          console.log(error);
          window.alert('Invalid Credentials');
        });
  }
  

}
