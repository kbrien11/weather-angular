import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  firstName: any;

  constructor(private http:HttpClient, private router:Router) { }

  email: string = ""
  password: string = ""
  @Input() token: string = ""
  userId : string = ""
  loginError:boolean = false
  success:boolean = false

  ngOnInit(): void {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
  }


  login() {
    let url = `http://localhost:8080/login/${this.email}/${this.password}`;
    

    this.http.post(url, {
      email:this.email,
      password:this.password
      
    }).toPromise().then((data:any) =>{
      
    console.log(data)

      if( data.length >0){
        this.token = data[0].token
        this.userId = data[0].id
      sessionStorage.setItem('token',this.token)
      sessionStorage.setItem('userId',this.userId)
        this.firstName = data[0].firstName
        this.loginError = false
        console.log(data)
        this.success = true
                // <<<---using ()=> syntax
          this.router.navigate(['/welcome']);
  
      }
      else{
       
        this.success = false
        this.loginError = true
        setTimeout(()=>{                           // <<<---using ()=> syntax
          window.location.reload()
      }, 3000);
      
      }
      
      
    }

    )
  }
}
