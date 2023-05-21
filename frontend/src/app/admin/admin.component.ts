import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
a1
  ngOnInit() {
    this.a1=  localStorage.getItem('status');
    console.log(this.a1)
  }
  x(){
    document.getElementById('butt').click();
  }
  onSignOut() {
   

    var a=null;
    localStorage.setItem('status',a );

    this.router.navigateByUrl('');
  }
}
