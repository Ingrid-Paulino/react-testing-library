import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';

import App from '../App';

describe('1. Testa o componente <App.js />', () => {
  it('1.1 - O primeiro link deve possuir o texto Home e deve ser clicavel', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
  });

  it('1.2 - O segundo link deve possuir o texto About e deve ser clicavel', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
  });

  it('1.3 - O terceiro link deve possuir o texto'
    + 'Favorite Pokémons e deve ser clicavel', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoritePokémonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoritePokémonsLink).toBeInTheDocument();
    userEvent.click(favoritePokémonsLink);
  });

  it('1.4 - Testa se a aplicação é redirecionada para a página Not Found'
    + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    // Simula algo escrito depois da barra e dar enter
    history.push('/rota-que-nao-existe');
    /*
    /Page requested not found/i - dessa forma não preciso escrever
    todo o texto e posso colocar em minusculo ou maiusculo que sera encontrado
    */
    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
