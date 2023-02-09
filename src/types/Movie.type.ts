export type Movie = {
  id: number;
  title: string;
  img: MovieImg;
  year: number;
};

export type MovieImg = {
  url: string;
  alt: string;
};
