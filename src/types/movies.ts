export type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  genre_ids: Genre[];
  genre_names: string[];
  poster_path: string;
};

export type Genre = {
  id: number[];
};

export type Option = {
  id: number | string;
  name: number | string;
};