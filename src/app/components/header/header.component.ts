import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 actionName:string="SignIn";
 loggedUserDetails:any;
 isLoginSuccess:boolean = false ;
 @ViewChild('closeBtn',{'read':ElementRef}) closeBtn!:ElementRef;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.loggedUserDetails = this.auth.getUser();
    if(this.auth.getToken()){
      this.isLoginSuccess = true ;
    }
  }

  
  changeAction(action:string){
    this.actionName = action;
  }

  handleLoginSuccess(flag:boolean){
    if(flag){
      this.isLoginSuccess = true ;
      this.closeBtn.nativeElement.click();
    }
  }

}
