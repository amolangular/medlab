import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

userDetls:any;
count:number = 0;


@ViewChild('closeBtn')closeBtn!:ElementRef
  constructor(private auth:AuthenticationService,private cartSvc:CartService){
    
  }

  ngOnInit(){
    this.cartSvc.cartCount.subscribe((response:any)=>{
      console.log("counter :" + this.count); 
      if(response){
        this.count=response;
       }
    })

    this.getCartItems();
  }


  getCartItems() {
   var cartItems = this.cartSvc.getCartItemsFromLocalStorage();
     if(cartItems != null){
      this.count = cartItems.length ;
     }
  }

  hideLoginBtn:boolean = false;
  action:string="Login";

  triggerAction(actionName:string){
    this.action = actionName;
  }

  getData(isLoginSuccess:boolean){
    if(isLoginSuccess){
      this.hideLoginBtn = true;
     this.userDetls = this.auth.getUser();
     this.closeBtn.nativeElement.click();
    }
  }

  logout(){
    localStorage.removeItem("userDetls");
    localStorage.removeItem("token");
    this.hideLoginBtn = false;
  }
}
