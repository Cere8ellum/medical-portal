import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [MailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
