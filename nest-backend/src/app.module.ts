import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TodoController } from './controllers/todo.controller';
import { AppService } from './services/app.service';
import { TodoService } from './services/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/user.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthorsModule } from './authors/authors.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { DataloaderModule } from './dataloader/dataloader.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: true,
          playground: false,
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        };
      },
      inject: [DataloaderService],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5436,
      host: 'localhost',
      username: 'treds_auth_admin',
      password: 'treds_auth_admin',
      database: 'treds_auth',
      entities: [UserEntity],
      synchronize: false,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthorsModule,
  ],
  controllers: [AppController, TodoController, UsersController],
  providers: [AppService, TodoService, UsersService],
  // exports: [TypeOrmModule]
})
export class AppModule {}
