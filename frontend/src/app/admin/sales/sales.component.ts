import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UsersdataService } from 'src/app/usersdata.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  productsList = [];
  a;
  salesList = [];
  constructor(private router: Router, private saleService: UsersdataService,
    private toast: ToastrService) { }

  getstockData() {
    var body11 = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68'

    }
    this.saleService.getInventory(body11).subscribe(data => {
      this.productsList = data;
      //this.dtTrigger.next();


    })
  }

  getsaleData() {
    var body11 = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68'

    }
    this.saleService.getSale(body11).subscribe(data => {
      this.salesList = data;
      this.dtTrigger.next();


    })
  }


  deleteRow() {

    this.saleService.deleteSale(this.a).subscribe(users => {
      if (users.success == true) {
        this.toast.success('Deleted', "", {
          positionClass: 'toast-top-left'
        });
        document.getElementById('cl7').click();
        this.getsaleData1();

      } else if (users.success == false) {
        this.toast.error('Error', "", {
          positionClass: 'toast-top-left'
        });

      }
    })
    this.updateDelTable();



  }


  del(p) {
    this.a = p;
  }


  c() {
    document.getElementById('cl7').click();

  }

  updateDelTable() {
    if ($.fn.dataTable.isDataTable('#stocktable')) {
      const mytbl = $('#stocktable').DataTable();
      mytbl.destroy();
    }
    this.dtTrigger.next();

  }


  addSale(form: NgForm) {
    var ss = form.value.productName.split('//');
    console.log(ss)


    var total = parseInt(ss[1]);
    var cost = parseInt(ss[2]);
    var profitt = form.value.price - cost;

    var newrem = total - form.value.quantity;
    console.log(newrem)

    var bool = true;

    if (form.value.quantity > total) {
      this.toast.error("quantity greater than total", "", {
        positionClass: 'toast-top-left'
      });
      bool = false;
    }


    if (ss[0] == "" || ss[0] == null) {
      this.toast.error("Enter Product Name", "", {
        positionClass: 'toast-top-left'
      });
      bool = false;
    }

    if (form.value.quantity == "" || form.value.quantity == null) {
      this.toast.error("Enter quantity", "", {
        positionClass: 'toast-top-left'
      });
      bool = false;
    }
    if (form.value.price == "" || form.value.price == null) {
      this.toast.error("Enter Color", "", {
        positionClass: 'toast-top-left'
      });
      bool = false;
    }

    if (form.value.date == "" || form.value.date == null) {
      this.toast.error("Enter Date", "", {
        positionClass: 'toast-top-left'
      });
      bool = false;
    }

    var uName = localStorage.getItem('userName');
    var uID = localStorage.getItem('userID');

    //console.log(uName)
    // console.log(uID)

    if (bool === true) {
      var body = {
        userName: uName,
        userID: uID,
        productName: ss[0],
        quantity: form.value.quantity,
        price: form.value.price,
        cost: parseInt(ss[2]),
        profit: profitt,
        date: form.value.date,
        total_products: newrem,
        id: ss[3]
      }

      console.log(body)
      this.saleService.addSale(body).subscribe(data => {
        // this.dswq = data;

        if (data.success === true) {
          this.toast.success("Successful", "", {
            positionClass: 'toast-top-left'
          });
          form.reset();
          document.getElementById('cl').click();
          this.getsaleData1();
        }
        else if (data.msg) {
          this.toast.error(data.msg, "", {
            positionClass: 'toast-top-left'
          });

        }
        else if (data.success === false) {
          this.toast.error("Unsucessful", "", {
            positionClass: 'toast-top-left'
          });

        }
      })


    }
  }


  getsaleData1() {
    this.productsList = []
    var body11 = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68'

    }
    this.saleService.getSale(body11).subscribe(data => {

      var myTable = $('#stocktable').DataTable();
      myTable.clear();
      this.salesList = data;

      if ($.fn.dataTable.isDataTable('#stocktable')) {
        const mytbl = $('#stocktable').DataTable();
        mytbl.destroy();
      }
      this.dtTrigger.next();


    })
  }






  ngOnInit() {

    var a = localStorage.getItem('status');
    console.log("a== " + a);

    if (a == "adminloggedin" || a == "employeeloggedin") {
    }

    else {
      this.router.navigateByUrl('home');

    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getstockData();
    this.getsaleData();


  }

}
