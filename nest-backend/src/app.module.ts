import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TodoController } from './controllers/todo.controller';
import { AppService } from './services/app.service';
import { TodoService } from './services/todo.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UsersModule } from "./user/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5436,
      host: 'localhost',
      username: 'treds_auth_admin',
      password: 'treds_auth_admin',
      database: 'treds_auth',
      entities: [UserEntity],
      synchronize: false,
    }),
    UsersModule
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
  // exports: [TypeOrmModule]
})
export class AppModule {}
