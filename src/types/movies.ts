export type Movie = {
  id: number;
  title: string;
  genre: string[];
  description: string;
  rating: number;
  released: string;
  // Add other movie properties as needed
};

export type Genre = {
  id: number;
  name: string;
};

export type Option = {
  id: number | string;
  name: number | string;
};