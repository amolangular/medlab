import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartArr:any=[];
  cartCount:BehaviorSubject<number>= new BehaviorSubject(0);


  constructor() { }

  addToCart(productObj:any){
    if(productObj) {
      this.cartArr.push(productObj);
      var cartDetlsStr = JSON.stringify(this.cartArr);
      localStorage.setItem("cart",cartDetlsStr); 
    }
    this.cartCount.next(this.cartArr.length);
  }
}
