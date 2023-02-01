import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todo!: Todo | undefined

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private router: Router,
              private notificationService: NotificationService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id')
      if (todoId) {
        this.todo = this.todoService.getTodo(todoId);
      }

    })

  }

  onFormSubmit(form: NgForm){
    if (form.invalid) return
    const id = this.todo ? this.todo.id : '';
        this.todoService.updateTodog(id, form.value);
        this.router.navigateByUrl("/todos")

        this.notificationService.show('Todo updated!')
  }


}

