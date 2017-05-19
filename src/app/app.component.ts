import { Component, OnInit } from '@angular/core';
import { TodoService } from "./services/todo.service";
import { ToDo } from "./models/todo.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'ToDo Angular 2';
  todos:any[]= [];
  task:string = '';
  showAlertChanged:boolean = false;

  constructor(private _todoService:TodoService){}

  ngOnInit(){
    this.getTodos().then(res => {
      for(let i = 0; i < Object.keys(res).length; i++){
        let todo = new ToDo(res[i].description);
        todo.complete = res[i].complete;
        todo.id = res[i]._id;
        this.todos.push(todo);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  newTask(){
    if(this.task == '') return;
    let todo = new ToDo(this.task);
    this.saveTodo(todo).then(res => {
      let obj = <any>res;
      let newTodo = new ToDo(obj.description);
      newTodo.complete = obj.complete;
      newTodo.id = obj._id;
      this.todos.push(newTodo);
      console.log(this.todos);
    }).catch(err => {
      console.log(err)
    })
  }

  remove(index:number){
    this.deleteTodo(this.todos[index]).then(res => {
      //console.log(res);
      console.log('deteled : ' + index);
      this.todos.splice(index, 1);
      console.log(this.todos);
    }).catch(err => {
      console.log(err);
    })
  }

  completeTask(index:number){
    this.todos[index].complete = !this.todos[index].complete;
    this.updateTask(this.todos[index]).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  changeTask(index:number, description:string){
    this.todos[index].description = description;
    this.updateTask(this.todos[index]).then(res => {
      console.log(res);
      this.showAlertChanged = !this.showAlertChanged;
      setTimeout(()=>{
        this.showAlertChanged = !this.showAlertChanged;
      },3000);
    }).catch(err => {
      console.log(err);
    });
  }

  getTodos(){
    return new Promise((resolve, reject) => {
      this._todoService.getTodos().subscribe(res => {
        if(!res) throw new Error('ToDo list is empty');
        resolve(res.todos);
      },
      err => {
        reject(err);
      });
    });
  }

  saveTodo(todo:ToDo){
    return new Promise((resolve, reject) => {
      this._todoService.saveTodo(todo).subscribe(res => {
        if(!res) throw Error('Task not created');
        resolve(res);
      },
      err => {
        reject(err);
      });
    });
  }

  deleteTodo(todo:ToDo){
    return new Promise((resolve, reject) => {
      this._todoService.deleteTodo(todo).subscribe(res => {
          if(!res) throw Error('Task not deleted');
          resolve(res);
      },
      err => {
        reject(err);
      });
    });
  }

  updateTask(todo:ToDo){
    return new Promise((resolve, reject) => {
      this._todoService.updateTodo(todo).subscribe(res => {
        if(!res) throw Error('Task not changed');
        resolve(res);
      },
      err => {
        reject(err);
      });
    });
  }



}
