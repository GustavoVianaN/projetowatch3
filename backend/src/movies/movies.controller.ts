import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesServices } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Query } from '@nestjs/common';
import { Movie } from '../movies/entities/movie.entity';

@AuthUser()
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesServices: MoviesServices) { }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesServices.create(createMovieDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<Movie>> {
    limit = limit > 100 ? 100 : limit;
    return this.moviesServices.findAll({
      page,
      limit,
      route: '/movies',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesServices.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesServices.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesServices.remove(+id);
  }
}
