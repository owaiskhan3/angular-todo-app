import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  todo: string = '';
  todos: Array<TodoType> = [];
  editedTodo: null | TodoType = null;
  console = console;

  ngOnInit() {
    const getLocalTodos = localStorage.getItem('todos');
    if (getLocalTodos) {
      this.todos = JSON.parse(getLocalTodos);
    }
  }

  onChangeTodo(event: any) {
    this.todo = event.target.value;
  }

  addTodo() {
    console.log('on Add Pressed', this.todo);
    if (this.todo) {
      this.todos.push({
        id: Math.floor(Math.random() * 1000),
        todo: this.todo,
        completed: false,
      });
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.todo = '';
      setTimeout(() => {
        console.log(this.todos);
      }, 2000);
    }
  }

  editTodo(todoToEdit: TodoType) {
    this.console.log({ todoToEdit });
    this.todo = todoToEdit.todo;
    this.editedTodo = todoToEdit;
    const input = document.getElementById('inputField');
    input?.focus();
  }

  onEditTodo() {
    const id = this.editedTodo?.id;
    if (id) {
      const index = this.todos.findIndex((t) => t.id === id);
      this.todos[index].todo = this.todo;
      this.editedTodo = null;
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.todo = '';
    }
  }

  toggleCompleted(passTodo: TodoType) {
    const index = this.todos.findIndex((todo) => todo.id === passTodo.id);
    this.todos[index].completed = !this.todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(passTodo: TodoType) {
    const filteredTodos = this.todos.filter((todo) => todo.id !== passTodo.id);
    this.todos = filteredTodos;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // onChangeTodo(event: any) {
  //   console.log('clicked');
  //   console.log({ event });
  // }
}
