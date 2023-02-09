import { useState } from 'react';
import { generateRecommendedMovies } from '../services/ia';
import { getMovieByName } from '../services/movies';
import type { Movie } from '../types/Movie.type';
import { DECADES } from '../types/SearchPreferences.type';
import CardMovie from './CardMovie';

export default function SearchSection() {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [decade, setDecade] = useState<keyof typeof DECADES>('ANY');
  const [referenceMovie, setReferenceMovie] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cleanMovies();
    setLoading(true);

    const resp = await generateRecommendedMovies({
      decade,
      referenceMovie,
    });
    resp.map((movie: string) =>
      getMovieByName(movie).then((movie) =>
        setMovies((movies) => [...movies, movie])
      )
    );

    setLoading(false);
  };

  const cleanMovies = () => setMovies([]);

  return (
    <>
      <form className='w-full md:max-w-md' onSubmit={handleSubmit}>
        <fieldset className='grid gap-6 text-lg' disabled={loading}>
          <div className={`flex flex-col gap-2 ${loading ? 'opacity-80' : ''}`}>
            <label htmlFor='decada'>Elegí una Década</label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                  ></path>
                </svg>
              </div>
              <select
                id='decada'
                name='decada'
                className='block w-full bg-transparent appearance-none border-2 rounded-md py-2.5 pr-4 pl-11 border-blue-900 text-white focus:border-blue-600 focus:outline-0 transition-all'
                value={decade}
                onChange={(e) =>
                  setDecade(e.target.value as keyof typeof DECADES)
                }
                required
              >
                {Object.keys(DECADES).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {DECADES[key as keyof typeof DECADES]}
                    </option>
                  );
                })}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-blue-50 h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'></path>
                </svg>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${loading ? 'opacity-80' : ''}`}>
            <label htmlFor='pelicula'>Película de Referencia</label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='pelicula'
                name='pelicula'
                defaultValue={referenceMovie}
                onChange={(e) => setReferenceMovie(e.target.value)}
                className='block w-full bg-transparent border-2 rounded-md py-2.5 pr-4 pl-11 border-blue-900 text-white placeholder-blue-200 focus:ring-blue-500 focus:border-blue-600 focus:outline-0 transition-all'
                placeholder='El Padrino'
              />
            </div>
          </div>

          <button
            type='submit'
            className={`bg-blue-800 hover:bg-blue-900 disabled:bg-slate-600 p-3 rounded-md flex justify-center items-center cursor-pointer mt-2 shadow-xl`}
          >
            {loading ? (
              <>
                <div role='status'>
                  <svg
                    aria-hidden='true'
                    className='inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='sr-only'>Loading...</span>
                </div>
              </>
            ) : (
              'Buscar recomendaciones'
            )}
          </button>
        </fieldset>
      </form>
      <div className='w-full flex flex-wrap items-center justify-around gap-5'>
        {movies.map((movie: Movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
