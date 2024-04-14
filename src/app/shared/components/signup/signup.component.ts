import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  userObj:User = new User();
  otpEntered!:number;
  displayOtpField: boolean = false;
  otpGenerated!: number;
  otpTimer!: number;

  isOtpVerified:boolean = false;
  isOtpInvalid:boolean = false;
  sub:any;
  constructor(private http:HttpService) {

  }

  ngOnInit() {

  }

  getOtp() {
    this.displayOtpField = true;
    this.otpGenerated = this.generateRandomNumber();
    console.log("OTP: ", this.otpGenerated);
    this.sub = interval(1000).subscribe({
      next: (response) => {
        this.otpTimer = 60 - response;
        if (this.otpTimer == 0) {
          this.sub.unsubscribe();
        }
      }
    })
  }

  generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
      .random() * (maxm - minm + 1)) + minm;
  }

  verifyOTP() {
     if(this.otpGenerated == this.otpEntered){
      this.displayOtpField = false;
      this.isOtpVerified = true;
      this.isOtpInvalid = false;
      this.userObj.isOtpVerified = true;
      this.sub.unsubscribe();
     }else {
      this.displayOtpField = true;
      this.isOtpVerified = false;
      this.isOtpInvalid = true;
     } 
  }

  signUp(){
    console.log("submit clicked");
    if(this.isOtpVerified){
      this.http.postDataToServer('users',this.userObj).subscribe({
        next:(response:any)=>{
          if(response){

          }
        }
      })
    }
  }

}

class User {
  name!:string;
  email!:string;
  mobileNo!:string;
  password!:string;
  isOtpVerified!:boolean
}
