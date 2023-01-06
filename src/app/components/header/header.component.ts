import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 actionName:string="SignIn";
 loggedUserDetails:any;
 isLoginSuccess:boolean = false ;
 cardCount!:Observable<number>
 sub!:Subscription
 @ViewChild('closeBtn',{'read':ElementRef}) closeBtn!:ElementRef;
 @ViewChild('loginBtn',{'read':ElementRef}) loginBtn!:ElementRef;

  constructor(private auth:AuthenticationService,private shared:SharedService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUserDetails = this.auth.getUser();
    if(this.auth.getToken()){
      this.isLoginSuccess = true ;
    }

  //  this.sub =  this.shared.cartObs.subscribe((el:any)=>{
  //     this.cardCount = el ;
  //    });

    this.cardCount = this.shared.cartObs;

       

  }

  
  changeAction(action:string){
    this.actionName = action;
  }

  handleLoginSuccess(flag:boolean){
    if(flag){
      this.isLoginSuccess = true ;
      this.loggedUserDetails = this.auth.getUser();
      this.closeBtn.nativeElement.click();
    }
  }

  redirectToCart(){
    if(this.isLoginSuccess){
      this.router.navigate(['cart'])
    }else {
       this.loginBtn.nativeElement.click();
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
