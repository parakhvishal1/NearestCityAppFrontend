import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { City } from '../city';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {

  city:City=new City;
  constructor(
    private authService:AuthService
  ) {
    this.getCity();
    //this.getCities();
   }
   /* getCities(){
     this.authService.getCities().subscribe((data:any)=>{
       console.log(data)
     })
   } */

   getCity(){
    this.authService.getAdminCity().subscribe((data:any)=>{
      console.log(data);
      this.city.name=data[0].city;
      this.city.id=data[0]._id;
      console.log(this.city); 
    })
   }
  ngOnInit(): void {
  }

  addCity(cityName:any){
    console.log(cityName);
    window.alert("City Added")
  }
  updateCity(cityName:any){
    console.log(cityName.value);
    this.authService.updateAdminCity(this.city.id,{"city":cityName.value}).subscribe((data:any)=>{
      console.log(data);
      this.getCity();
      window.alert("City Updated")
  });

  }
}
