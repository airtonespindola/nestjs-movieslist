import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducersModule } from './producers/producers.module';
import { StudiosModule } from './studios/studios.module';
import { MoviesModule } from './movies/movies.module';
import { IndicationsModule } from './indications/indications.module';

@Module({
  imports: [ProducersModule, StudiosModule, MoviesModule, IndicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
