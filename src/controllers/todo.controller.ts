import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TodoService } from 'src/services/todo.service';
import {
  IAddTodoPayload,
  IGetTodosResponse,
  ITodoItem,
  validateTodo,
} from 'validation';
const todoList: ITodoItem[] = [
  {
    text: 'Feed the cat',
  },
  {
    text: 'Go to work',
  },
  {
    text: 'Have a delicious ice cream',
  },
];
@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): IGetTodosResponse {
    return {
      todoList: todoList,
    };
  }

  @Post()
  postTodos(@Body() payload: IAddTodoPayload): IGetTodosResponse {
    const todoItem = payload.todoItem;
    const result = validateTodo(todoItem);
    if (!result.valid) {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    //
    // The todo item is valid, add it to the todo list.
    //
    todoList.push(todoItem);
    return this.getTodos();
  }
}
