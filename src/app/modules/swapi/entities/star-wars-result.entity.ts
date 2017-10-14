import {StarWarsCharacter} from './star-wars-character.entity';

export type StarWarsResult = Readonly<{
  results: Array<StarWarsCharacter>;
  count: number;
}>;
