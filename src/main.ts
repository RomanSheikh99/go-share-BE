import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ abortOnError: false });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT,() => {
    console.log(`server is running on port http://${process.env.HOST}:${process.env.PORT}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
