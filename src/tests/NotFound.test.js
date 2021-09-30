import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('4. Teste o componente <NotFound.js />', () => {
  it('4.1 - Testa se página contém um heading h2'
    + 'com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const msg = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(msg).toBeInTheDocument();
  });

  it('4.2 - Teste se página mostra a imagem:', () => {
    renderWithRouter(<NotFound />);

    const IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = screen.getByAltText(/Pikachu crying/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', IMAGE);
  });
});
