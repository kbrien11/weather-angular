import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginError: boolean;

  constructor(private http:HttpClient) { }

  email: String = ""
  password:String = ""
  firstName: String = ""
  lastName: String = ""
  registered:boolean = false

  ngOnInit(): void {
  }

  login() {
    let url = 'http://localhost:8080/create';
    

    this.http.post(url, {
      email:this.email,
      password:this.password,
      firstName:this.firstName,
      lastName:this.lastName
      
    }).toPromise().then((data:any) =>{
      
    console.log(data)

      if( data != null){
        this.loginError = false
        this.registered = true
        setTimeout(()=>{                           // <<<---using ()=> syntax
          window.location.reload()
      }, 3000);
      }
      else{
       
        this.registered = false
        this.loginError = true
        setTimeout(()=>{                           // <<<---using ()=> syntax
          window.location.reload()
      }, 3000);
      
      }
      
      
    }

    )
  }

}
