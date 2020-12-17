import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { City } from '../city';

@Component({
  selector: 'app-user-dasboard',
  templateUrl: './user-dasboard.component.html',
  styleUrls: ['./user-dasboard.component.css']
})
export class UserDasboardComponent implements OnInit {
  toggle:boolean=false;
  destCity:City=new City;
  sourceCity:City=new City;
  distance:number=0;
  constructor(
    private authService:AuthService
  ) {
    console.log(this.sourceCity);
    console.log(this.destCity);
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
      this.sourceCity.name=data[0].city;
      this.sourceCity.id=data[0]._id;
     // console.log(this.city); 
      this.getSourceLocation();
    })
   }
  ngOnInit(): void {
  }

  getDistance(cityName:any){
    console.log(cityName);
    this.destCity.name=cityName.value;
    this.getDestLocation();
    
  }
  

  getSourceLocation(){
    this.authService.getLocation(this.sourceCity.name).subscribe((data:any)=>{
      console.log(data.data);
      console.log(this.sourceCity);
      this.sourceCity.latitude=data.data[0].latitude;
      this.sourceCity.longitude=data.data[0].longitude;

    });
  }

  getDestLocation(){
    this.authService.getLocation(this.destCity.name).subscribe((data:any)=>{
      if(data!=null && data.data!=undefined && data.data.length!=0){console.log(data);
      this.destCity.latitude=data.data[0].latitude;
      this.destCity.longitude=data.data[0].longitude;
      console.log();
      this.distance=this.calculateDistance(this.sourceCity,this.destCity);
      this.toggle=true;
      }else{
        window.alert('Invalid City');
      }
    },(error:any)=>{
      window.alert('Invalid City');
    });
  }
  changeToggle(){
    console.log(1)
    this.toggle=false;
  }
  calculateDistance(source:City,dest:City){
    console.log(source);
    console.log(dest);
    let dlong = dest.longitude*(Math.PI/180) - source.longitude*(Math.PI/180); 
    let dlat = dest.latitude*(Math.PI/180) - source.latitude*(Math.PI/180);
    let ans = Math.pow(Math.sin(dlat / 2), 2) +  
                          Math.cos(source.latitude*(Math.PI/180)) * Math.cos(dest.latitude*(Math.PI/180)) *  
                          Math.pow(Math.sin(dlong / 2), 2); 
  
    ans = 2 * Math.asin(Math.sqrt(ans)) * 6371; 
     /*  var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((dest.latitude - source.latitude) * p)/2 + 
              c(source.latitude * p) * c(dest.latitude * p) * 
              (1 - c((dest.longitude - source.longitude) * p))/2; */
    
      return ans // 2 * R; R = 6371 km
  }
}
