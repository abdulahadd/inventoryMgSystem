import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import {  ToastrService } from 'ngx-toastr';
import { UsersdataService } from '../usersdata.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataFromSignIn;
  userDataList=[];
 public flag;
 public flag1;
  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastrService,
    private userdataservice: UsersdataService
  ) { }
  
  ngOnInit() {
   
    
    var a =  localStorage.getItem('status');
    console.log("a== "+a);
    if(a=="adminloggedin"){

      this.router.navigateByUrl('admin/sales');
    
  }
  else if(a=="employeeloggedin"){
  this.router.navigateByUrl('admin/sales');
  }
   }
  
 
from;to;
  onSignIn(form: NgForm) {
 
    var bool =true;

    if(form.value.email==''||form.value.email==null){
       this.toast.error("Enter Email","Invalid Input");
       bool =false;
    }
    
    if(form.value.password==''||form.value.password==null){
      bool =false;
      this.toast.error("Enter Password","Invalid Input");

    }
    if(bool===true){
            
        var body={
          email: form.value.email,
          password: form.value.password
        } 
      this.auth.onSignin(body).subscribe(data => {

        if(data.success==true){
          localStorage.setItem('userName',data.user.username );
          localStorage.setItem('userID',data.user._id );


                  var o=data.user.usertype;
                  console.log(data)
                  if(o==="Admin"){
            
                    var a="adminloggedin";
                    localStorage.setItem('status',a );
                    this.router.navigateByUrl('admin/sales');

                  }
                  else if(o==="Employee"){
                    
                          var a="employeeloggedin";
                          localStorage.setItem('status',a );
                          this.router.navigateByUrl('admin/sales');
                      }

        }
        if(data.msg){
          this.toast.error(data.msg,"Invalid Input");

        }

      })

    }

 
  }


}
