import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UsersdataService } from 'src/app/usersdata.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  productsList=[];
  
  constructor(private router: Router,private stockService:UsersdataService,
    private toast: ToastrService ) { }

 addstock(form: NgForm){
   var bool= true;
  if (form.value.name == ""||form.value.name == null) {
    this.toast.error("Enter Name","",{
      positionClass: 'toast-top-left' 
    });
    bool= false;
  }

  if (form.value.supplier == ""||form.value.supplier == null) {
    this.toast.error("Enter Supplier","",{
      positionClass: 'toast-top-left' 
    });
    bool= false;
  }
  if (form.value.color == ""||form.value.color == null) {
    this.toast.error("Enter Color","",{
      positionClass: 'toast-top-left' 
    });
    bool= false;
  }
  if (form.value.total_products ==""||form.value.total_products == null ) {
    this.toast.error("Enter Total Products","",{
      positionClass: 'toast-top-left' 
    });
    bool= false;
  }
  if (form.value.modelNo == ""||form.value.modelNo == null) {
    this.toast.error("Enter Model#","",{
      positionClass: 'toast-top-left' 
    });
    bool= false;
  }

  if (form.value.cost == ""||form.value.cost == null) {
    this.toast.error("Enter Cost","",{
      positionClass: 'toast-top-left' 
    });
    bool= false;
  }
  if (form.value.date == ""||form.value.date == null) {
    this.toast.error("Enter Date","",{
      positionClass: 'toast-top-left' 
    });
    bool= false;
  }
  if(bool===true){
    var body={
     name: form.value.name ,
     supplier: form.value.supplier ,
     color:form.value.color,
     total_products: form.value.total_products ,
     modelNo: form.value.modelNo ,
     cost:form.value.cost,
     date:form.value.date
    }

    console.log(body)
    this.stockService.addInventory(body).subscribe(data => {
      // this.dswq = data;

      if (data.success===true) {
        this.toast.success("Successful","",{
          positionClass: 'toast-top-left' 
        });
        form.reset();
        document.getElementById('cl').click();
        this.getstockData1();
      }
      else if(data.msg) {
        this.toast.error(data.msg,"",{
          positionClass: 'toast-top-left' 
        });

      }
      else if(data.success===false) {
        this.toast.error("Unsucessful","",{
          positionClass: 'toast-top-left' 
        });

      }
    })
  

  }
 
  }

  a;
  del(p)
  {
      this.a=p;
  }
  c(){
    document.getElementById('cl7').click();
    
  }
  deleteRow(){
    
    this.stockService.delete(this.a).subscribe(users=>{
      if(users.success==true){
        this.toast.success('Deleted',"",{
          positionClass: 'toast-top-left' 
        });
        document.getElementById('cl7').click();
          this.getstockData1();

      }else if(users.success==false){
        this.toast.error('Error',"",{
          positionClass: 'toast-top-left' 
        });

      }
    })
    this.updateDelTable();


  
}



getstockData1(){
  this.productsList=[]
  var body11 ={
    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68'
    
    }
  this.stockService.getInventory(body11).subscribe(data=>{

    var myTable = $('#stocktable').DataTable();
    myTable.clear();
    this.productsList=data;
    
    if ($.fn.dataTable.isDataTable('#stocktable')) {
      const mytbl = $('#stocktable').DataTable();
      mytbl.destroy();
    }
    this.dtTrigger.next();

 
  })
}


updateDelTable(){
  if ($.fn.dataTable.isDataTable('#stocktable')) {
    const mytbl = $('#stocktable').DataTable();
    mytbl.destroy();
  }
  this.dtTrigger.next();

}

  getstockData(){
    var body11 ={
      token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68'
      
      }
    this.stockService.getInventory(body11).subscribe(data=>{
      this.productsList=data;
      this.dtTrigger.next();

   
    })
  }
 

  ngOnInit() {
 
    var a =  localStorage.getItem('status');
    console.log("a== "+a);
  
    if(a=="adminloggedin"||a=="employeeloggedin"){
   }
   
   else{
    this.router.navigateByUrl('home');

   }
   this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5
  };
    this.getstockData();
    var userName=localStorage.getItem('userName');
    var userID=localStorage.getItem('userID');

    console.log(userName)
    console.log(userID)

  }

}
