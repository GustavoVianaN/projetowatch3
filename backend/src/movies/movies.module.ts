import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MoviesServices } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesServices],
  exports: [MoviesServices],
})
export class MoviesModule {}
