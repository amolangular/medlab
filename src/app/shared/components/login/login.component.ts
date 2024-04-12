import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  isNewUser:boolean = false
  constructor(private fb:FormBuilder,private http:HttpService){

  }

  ngOnInit(){
     this.initializeForm();
  }


  initializeForm() {
    this.loginForm = this.fb.group({
      'email':[''],
      'password':['']
    })
  }

  login(){
    const httpParams: HttpParams = new HttpParams()
                                   .set('email',this.loginForm.get('email')?.value)
                                   .set('password',this.loginForm.get('email')?.value)

    this.http.getDataFromServer('users',httpParams).subscribe({
      next:(response:any)=>{
        if(response && response.length > 0){
          this.isNewUser = false
        }else {
            this.isNewUser = true;
        }
      }
    })

  }
}
