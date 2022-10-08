import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ApproverModule } from './approver/approver.module';

@Module({
  imports: [TestModule, UserModule, AuthModule, ApproverModule],
})
export class CoreModule {}
