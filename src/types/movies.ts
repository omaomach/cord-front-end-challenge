export type Movie = {
  id: number;
  title: string;
  genre: string[];
  image: string;
  overview: string;
  rating: number;
  releaseDate: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Option = {
  id: number | string;
  name: number | string;
};