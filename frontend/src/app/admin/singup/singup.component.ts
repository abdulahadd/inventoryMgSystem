import { Component, OnInit } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  dataFromSignup;
  constructor(private router: Router, private auth: AuthService, private toast: ToastrService) {

  }

  ngOnInit() {
    
    var a =  localStorage.getItem('status');
    console.log("a== "+a);
  
    if(a=="adminloggedin"){
   }
   
   else{
    this.router.navigateByUrl('home');

   }


  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.value.username == "") {
      this.toast.error('Enter user name ',"",{
        positionClass: 'toast-top-left' 
      });
      return;
    }
    
    if (form.value.email == "") {
      console.log("Enter email", "invalidasda");
      this.toast.error('Enter email ',"",{
        positionClass: 'toast-top-left' 
      });
      return;

    }
    if (form.value.password == "") {
      console.log("Enter password");
      this.toast.error('Enter password ',"",{
        positionClass: 'toast-top-left' 
      });
      return;
    }
    if (form.value.confirmPassword == "") {
      console.log("Enter password");
      this.toast.error('Enter confirm password ',"",{
        positionClass: 'toast-top-left' 
      });
      return;
    }
    if (form.value.password != form.value.confirmPassword) {
      this.toast.error("password didn't matched","",{
        positionClass: 'toast-top-left' 
      });
      return;

    }

    if (form.value.usertype == "") {
      console.log("Enter user type");
      this.toast.error('Enter user type ',"",{
        positionClass: 'toast-top-left' 
      });
      return;
    }
  
    var check=this.validateEmail(form.value.email);
    // console.log("emailcheck="+check);
   if(check==true){
    const body = {
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
      usertype: form.value.usertype,
      status:"Active"
    }
    this.auth.onSignup(body).subscribe(data => {

      if(data.success){
        this.toast.success("successful","",{
          positionClass: 'toast-top-left' 
        });
        this.router.navigateByUrl('admin/userdetail');

      }else if(data.msg){
        this.toast.error(data.msg,"",{
          positionClass: 'toast-top-left' 
        });

      }

    })
   }
   else{
    this.toast.error('Invalid Email ',"",{
      positionClass: 'toast-top-left' 
    });
   }
    
  }
}
