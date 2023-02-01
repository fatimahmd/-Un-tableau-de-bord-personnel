import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] =[]

  storageListenSub: Subscription

  updateTodo: any;
  updategTodo: any;

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage')
    .subscribe((event: Event) => {
      if (event instanceof StorageEvent && event.key === 'todos') {
        this.loadState();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
    }

  getTodos():Todo[] {
    return this.todos;
  }


  getTodo(id:string){
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo){
    this.todos.push(todo)
    this.saveState()
  }

  updateTodog(id: string, updatedTodoFields: Partial<Todo>){
    const todo =this.getTodo(id)
    // Object.assign(todo, updatedTodoFields)

    if (todo) {
      Object.assign(todo, updatedTodoFields);
    }
    this.saveState()
  }

  deleteTodo(id: string){
    const index = this.todos.findIndex(t => t.id ==id)
    if (index == -1) return

    this.todos.splice(index, 1)
    this.saveState()
  }

  saveState(){
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  loadState() {
    try {
      const todosInStorage = localStorage.getItem('todos');
      if(todosInStorage) {
        this.todos.length = 0 //Clear the todos array (while keeping the reference)
        const parsedTodos = JSON.parse(todosInStorage)
        this.todos.push(...parsedTodos)
  } }catch(e){
      console.log('there was an error retrieving the notes from localStorage')
      console.log(e)
    }
  }


}
