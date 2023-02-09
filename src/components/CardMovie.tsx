import type { Movie } from '../types/Movie.type';

export default function CardMovie({ movie }: { movie: Movie }) {
  return (
    <article className='max-w-xs flex flex-col rounded-md border-2 border-blue-700 overflow-hidden shadow-md shadow-blue-900'>
      <img
        src={movie.img.url}
        alt={movie.img.alt}
        className='h-full max-h-[25rem] w-full object-cover border-b-2 border-blue-700 aspect-square'
      />
      <h2 className='text-xl font-bold pt-2 px-3 whitespace-nowrap text-ellipsis overflow-hidden'>
        {movie.title}
      </h2>
      <span className='px-3 text-blue-500'>{movie.year}</span>
      <div className='flex items-center flex-wrap space-x-2 px-3 pb-2'>
        <span className='text-slate-400 text-sm'>Disponible en:</span>
        <a href='' target='_blank' rel='noreferrer'>
          <img src='/netflix.svg' className='w-6 h-6' />
        </a>
        <a href='' target='_blank' rel='noreferrer'>
          <img src='/amazon-prime.svg' className='w-6 h-6' />
        </a>
        <a href='' target='_blank' rel='noreferrer'>
          <img src='/disney-plus.svg' className='w-8 h-8' />
        </a>
        <a href='' target='_blank' rel='noreferrer'>
          <img src='/hbo.svg' className='w-8 h-8' />
        </a>
      </div>
    </article>
  );
}
