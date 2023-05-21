import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersdataService {


  constructor(private http: Http) { }


  getUserData(body) {
    // return this.http.get('http://localhost:5000/user/getuserdata').pipe(map(res=>res.json()));
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.put('http://localhost:5000/user/getuserdata/', body, { headers: headers }).pipe(
      map(res => res.json())
    )
  }

  deleteuser(body: string) {
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.put('http://localhost:5000/user/userdelete/' + body, { headers: headers }).pipe(
      map(res => res.json())
    )
  }
  updateuser(newuser, id) {
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
      .put('http://localhost:5000/user/updateuser/' + id, newuser, { headers: headers }).pipe(
        map(res => res.json)
      )
  }
  firstUser() {
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
      .post('http://localhost:5000/user/firstUser/', { headers: headers }).pipe(
        map(res => res.json)
      )
  }
  addInventory(body) {
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
      .post('http://localhost:5000/api/addInventory/', body, { headers: headers }).pipe(
        map(res => res.json())
      )
  }

  addSale(body) {
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http
      .post('http://localhost:5000/api/addSale/', body, { headers: headers }).pipe(
        map(res => res.json())
      )
  }




  getInventory(body) {
    // return this.http.get('http://localhost:5000/user/getuserdata').pipe(map(res=>res.json()));
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.post('http://localhost:5000/api/getInventory/', body, { headers: headers }).pipe(
      map(res => res.json())
    )
  }

  getSale(body) {
    // return this.http.get('http://localhost:5000/user/getuserdata').pipe(map(res=>res.json()));
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.post('http://localhost:5000/api/getSale/', body, { headers: headers }).pipe(
      map(res => res.json())
    )
  }


  delete(a) {
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.put('http://localhost:5000/api/deleteInventory/', a, { headers: headers }).pipe(
      map(res => res.json())
    )
  }

  deleteSale(a) {
    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.put('http://localhost:5000/api/deleteSale/', a, { headers: headers }).pipe(
      map(res => res.json())
    )
  }




}
