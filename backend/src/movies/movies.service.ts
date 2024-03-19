import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Pagination, IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class MoviesServices {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    return await this.movieRepository.save(createMovieDto);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Movie>> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    return paginate<Movie>(queryBuilder, options);
  }

  async findOne(id: number) {
    return await this.movieRepository.findOne({ where: [{ id }] });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return await this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: number) {
    return await this.movieRepository.delete(id);
  }
}
