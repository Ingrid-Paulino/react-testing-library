import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './helper/renderWithRouter';

const pokemonMock = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};

const beforeEachRenderPokemon = () => {
  beforeEach(() => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
  });
};

describe('6. Testa o componente <Pokemon.js />', () => {
  describe('Card pokemon', () => {
    beforeEachRenderPokemon();

    it('6.1 - O nome correto do Pokémon deve ser mostrado na tela', () => {
      const pokemonName = screen.getByText(pokemonMock.name);
      expect(pokemonName).toBeInTheDocument();
    });

    it('6.2 - O tipo correto do Pokémon deve ser mostrado na tela', () => {
      const pokemonType = screen.getByText(pokemonMock.type);
      expect(pokemonType).toBeInTheDocument();
    });

    it('6.3 - O peso médio do pokémon deve ser exibido com um texto no formato'
      + 'Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são,'
      + 'respectivamente, o peso médio do pokémon e sua unidade de medida.', () => {
      const { value, measurementUnit } = pokemonMock.averageWeight;
      const text = `Average weight: ${value} ${measurementUnit}`;
      const AverageWeight = screen.getByText(text);
      expect(AverageWeight).toBeInTheDocument();
    });

    it('6.4 - A imagem do Pokémon deve ser exibida. Ela deve conter um atributo'
    + 'src com a URL da imagem e um atributo alt com o texto <name> sprite,'
    + 'onde <name> é o nome do pokémon', () => {
      const img = screen.getByAltText(`${pokemonMock.name} sprite`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', pokemonMock.image);
    });
  });

  describe('Link no card Pokemon', () => {
    it(`6.5 - Contém um link de navegação para exibir detalhes deste Pokémon.
        O link deve possuir a URL /pokemons/<id>,onde <id> é o id do Pokémon exibido`,
    () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/pokemons/${pokemonMock.id}`);
    });

    it(`6.6 - Ao clicar no link de navegação do Pokémon,
        é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`,
    () => {
      const { history } = renderWithRouter(<Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />);
      const link = screen.getByRole('link');
      fireEvent.click(link);
      const pathPokemonDetails = history.location.pathname;
      expect(pathPokemonDetails).toBe(`/pokemons/${pokemonMock.id}`);
    });
  });

  describe('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    beforeEachRenderPokemon();

    it('6.7 - O ícone deve ser uma imagem com o atributo src contendo'
      + 'o caminho /star-icon.svg. A imagem deve ter o atributo alt igual'
      + 'a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.',
    () => {
      const complemento = 'is marked as favorite';
      const estrelaIcon = screen.getByAltText(`${pokemonMock.name} ${complemento}`);
      expect(estrelaIcon).toBeInTheDocument();
      expect(estrelaIcon).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
