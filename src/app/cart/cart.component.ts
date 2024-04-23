import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any;
  orderObj: Order = new Order();
  productList: Product[] = [];
  constructor(private cart: CartService,private router:Router) {

  }

  ngOnInit(): void {
    this.cartItems = this.cart.getCartItemsFromLocalStorage();
    console.log("cartItems", this.cartItems);
    this.setProductList();
    this.calculateTotalPrice();
  }


  setProductList() {
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.forEach((item: any) => {
        var productObj = new Product();
        productObj.productName = item.medicineName;
        productObj.brand = item.brand;
        productObj.description = item.description;
        productObj.actualPrice = item.actualPrice;
        productObj.quantity = 1;
        productObj.discountPrice = item.discountPrice;
        productObj.totalPrice = productObj.discountPrice * productObj.quantity;
        productObj.type = item.type;
        productObj.drugCode = item.drugCode;
        this.productList.push(productObj);
      });
      this.orderObj.products = this.productList;
    }
  }

  quantityChange(type:string,index:number){
    var selectedProduct = this.orderObj.products[index];
    if(type == 'Positive'){
      ++selectedProduct.quantity
    }else{
      --selectedProduct.quantity
    }
   selectedProduct.totalPrice = selectedProduct.discountPrice * selectedProduct.quantity;
   this.calculateTotalPrice();
  }

  calculateTotalPrice(){
    this.orderObj.totalAmount = 0 ;
    this.orderObj.totalDiscount = 0 ;
    this.orderObj.products.forEach((item:any)=>{
      console.log("item price",item.totalPrice);
      this.orderObj.totalAmount += Number(item.totalPrice);
    })
  }


  checkout(){
     this.router.navigate(["/booking-details"]);
  } 

}

export class Order {
  orderId!: string;
  fullName!: string;
  mobileNo!: number;
  emailId!: string;
  totalAmount!: number;
  totalDiscount!: number;
  totalItems!: number;
  finalAmount!: number;
  deliveryType!: string;
  addressDetails: Address = new Address();
  products: Product[] = []
}

export class Address {
  city!: string;
  pincode!: number;
  state!: string;
  addressLine1!: string;
  addressLine2!: string;
}

export class Product {
  productName!: string;
  actualPrice!: number;
  quantity!: number;
  drugCode!: string;
  totalPrice!: number;
  discountPrice!: number;
  description!: string;
  brand!: string;
  type!: string;
}  

function generateRandomNumber(): string {
  throw new Error('Function not implemented.');
}

