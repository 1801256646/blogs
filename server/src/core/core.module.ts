import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ApproverModule } from './approver/approver.module';
import { UploadModule } from './upload/upload.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ApproverModule,
    UploadModule,
    PasswordModule,
  ],
})
export class CoreModule {}
