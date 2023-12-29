import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  public todosState = signal<Array<Todo>>([]);

  public updateTodos({ id, title, description, done }: Todo): void {
    if ((title && id && description !== null) || undefined) {
      this.todosState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, done));
        }
      });

      /* O mudate é responsável por fazer a alteração(update) 
        baseado em algum valor anterior
      */

         this.saveTodosInLocalStorage();

     
    }
  }

  public saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todosState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
  }
}
