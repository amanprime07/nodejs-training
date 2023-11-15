import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session/session.decorator';
import UserRoles from 'supertokens-node/recipe/userroles';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(new AuthGuard())
  async getTest(@Session() session: SessionContainer): Promise<string> {
    await UserRoles.addRoleToUser(session.getUserId(), 'user');
    // TODO: magic
    return 'magic';
  }

  @Post('createRole')
  async createRole(@Body() payload: any) {
    /**
     * You can choose to give multiple or no permissions when creating a role
     * createNewRoleOrAddPermissions("user", []) - No permissions
     * createNewRoleOrAddPermissions("user", ["read", "write"]) - Multiple permissions
     */
    const response = await UserRoles.createNewRoleOrAddPermissions(
      payload.role,
      ['read'],
    );

    if (response.createdNewRole === false) {
      // The role already exists
    }
  }
}
