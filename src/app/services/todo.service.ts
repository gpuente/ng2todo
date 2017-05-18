import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/observable";

@Injectable()
export class TodoService {

  url:string = 'http://localhost/api/todo';
  headers:Headers;

  constructor(private http:Http,) { this.headers = new Headers({'Content-Type':'application/json'}); }

  getTodos(){
    return this.http.get(this.url, this.headers)
      .map(res => res.json());
  }

  deleteTodo(todo:any){
    return this.http.delete(`${this.url}/${todo.id}`, this.headers)
      .map(res => res.json());
  }

  updateTodo(todo:any){
    return this.http.put(`${this.url}/${todo.id}`, todo, this.headers)
      .map(res => res.json());
  }

  saveTodo(todo:any){
    return this.http.post(this.url, todo, this.headers)
      .map(res => res.json());
  }

}
