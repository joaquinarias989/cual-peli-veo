import type { Movie } from '../types/Movie.type';

const API_KEY: string = import.meta.env['PUBLIC_API_KEY'];
const API_URI_SEARCH: string = `${
  import.meta.env['PUBLIC_API_URI_SEARCH']
}/movie?&api_key=${API_KEY}&query=`;
const API_URI_IMGS: string = import.meta.env['PUBLIC_API_URI_IMGS'];

export async function getMovieByName(movieName: string): Promise<Movie> {
  const response = await fetch(API_URI_SEARCH + movieName);
  const data = await response.json();
  const movieDetail = data.results[0];
  const movie: Movie = {
    id: movieDetail.id,
    title: movieDetail.title,
    img: {
      url: API_URI_IMGS + movieDetail.poster_path,
      alt: movieDetail.title,
    },
    year: new Date(movieDetail.release_date).getFullYear(),
  };
  return movie;
}
