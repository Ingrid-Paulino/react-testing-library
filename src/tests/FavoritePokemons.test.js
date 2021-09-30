import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons.js />', () => {
  // beforeEach(() => render(<About />)); // Para cada teste ele passa aqui

  it('3.1 - Testa se é exibido na tela a mensagem "No favorite pokemon found",'
    + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });

  it('3.2 - Testa se é exibido todos os cards de pokémons favoritados', () => {
    const pokemonsMock = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    }];

    renderWithRouter(<FavoritePokemons pokemons={ pokemonsMock } />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(2);
    expect(pokemons[0]).toHaveTextContent('Pikachu');
    expect(pokemons[1]).toHaveTextContent('Charmander');
  });
});
