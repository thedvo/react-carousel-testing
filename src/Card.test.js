import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';
import App from './App';

// smoke test - CARD
it('rendeers the carousel', function () {
	render(<Card />);
});

// snapshot test - CARD
it('matches snapshot', function () {
	const { asFragment } = render(<Card />);
	expect(asFragment()).toMatchSnapshot();
});
