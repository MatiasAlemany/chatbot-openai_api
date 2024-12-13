import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en todo el proyecto
      envFilePath: '.env', // Especifica el archivo .env (por defecto, busca en la raíz del proyecto)
    }),
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
