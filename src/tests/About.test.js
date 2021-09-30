import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';

import About from '../components/About';

describe('2. Testa o componente <About.js />', () => {
  it('2.1 - Testa se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
  });

  it('2.2 - Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    // Ex com distruturação - sem usar o metodo screen, o lint reclamou
    // const { getByText, getByRole } = renderWithRouter(<About />);

    renderWithRouter(<About />);

    // const aboutHeading = getByRole('heading', {
    //   level: 2,
    //   name: 'About Pokédex',
    // });

    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  it('2.3 - Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    // Ex com distruturação - sem usar o metodo screen, o lint reclamou
    // const { getByText, getByRole } = renderWithRouter(<About />);
    renderWithRouter(<About />);
    // const aboutText = getByText(/This application simulates.../i);

    const aboutParagrafo1 = screen.getByText(/This application simulates.../i);
    const aboutParagrafo2 = screen.getByText(/One can filter Pokémons by type.../i);

    expect(aboutParagrafo1).toBeInTheDocument();
    expect(aboutParagrafo2).toBeInTheDocument();
  });

  it('2.4 - Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const IMAGE = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
      + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', IMAGE);
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
