import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersdataService } from './usersdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';
  constructor(
    private router: Router,
    private userdataservice: UsersdataService

  ) { }

  ngOnInit() {
    var body ={
      token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68'
      
      }
    this.userdataservice.getUserData(body).subscribe(user => {
      if(user.length===0){
        this.userdataservice.firstUser().subscribe(data => {
        })
      }

    })
  
    // document.body.style.zoom="90%"

  }



}
