import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'; //posso usar userEvent tbm
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

/*
  // Consultei o repositório do Fernando para resolver essa parte.
  // Link do repositório: https://github.com/tryber/sd-014-a-project-react-testing
  -library/pull/23/commits/8a18b2188405b80db0aefd0f74b27522ade847db
*/

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingH2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista'
    + 'quando o botão Próximo pokémon é clicado.', () => {
    // O botão deve conter o texto Próximo pokémon;
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();

    const firstPokemon = pokemons.filter((pokemon) => pokemon !== pokemons[0]);
    const pokemonsButtonNext = [...firstPokemon, pokemons[0]];

    pokemonsButtonNext.forEach((pokemon) => {
      fireEvent.click(buttonNext);
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});

describe('Pokédex tem os botões de filtro', () => {
  const types = pokemons.reduce((acc, pokemon) => {
    if (!acc.includes(pokemon.type)) {
      acc.push(pokemon.type);
    }
    return acc;
  }, []);

  it('Testa se Exibe um botão de filtragem para cada tipo de pokemons', () => {
    const allTypesbuttons = screen.getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => {
      const buttonType = allTypesbuttons[index];
      expect(buttonType).toBeInTheDocument();
      expect(buttonType).toHaveTextContent(type);
    });
  });

  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente'
    + 'pelos pokémons daquele tipo. O texto do botão deve corresponder'
      + 'ao nome do tipo, ex. Psychic;', () => {
    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      fireEvent.click(button);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(type);
      const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      fireEvent.click(buttonNext);
      expect(pokemonType).toHaveTextContent(type);
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro:'
    + 'O texto do botão deve ser All e ele precisa estar sempre visivel', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toHaveTextContent('All');

    // estar sempre visivel
    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      fireEvent.click(button);
      expect(buttonAll).toBeInTheDocument();
      expect(buttonAll).toBeVisible();
    });
  });

  it('Ao clicar no botão All, a Pokédex deve voltar ao estado inicial', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    const firstPokemon = pokemons[0];
    const pokemonName = screen.getByText(firstPokemon.name);
    expect(pokemonName).toBeInTheDocument();
  });
});
