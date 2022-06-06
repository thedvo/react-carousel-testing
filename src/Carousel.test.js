import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';
import Card from './Card';
import App from './App';

it('works when you click on the right arrow', function () {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(
		queryByAltText('Photo by Richard Pasquarella on Unsplash')
	).toBeInTheDocument();
	expect(
		queryByAltText('Photo by Pratik Patel on Unsplash')
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		queryByAltText('Photo by Richard Pasquarella on Unsplash')
	).not.toBeInTheDocument();
	expect(
		queryByAltText('Photo by Pratik Patel on Unsplash')
	).toBeInTheDocument();
});

// a test that expects that when you’re on the second image, clicking the left arrow will move you to the first image.
it('works when you click on the left arrow', function () {
	const { getByTestId, queryByAltText } = render(<Carousel />);
	const leftArrow = getByTestId('left-arrow');
	const rightArrow = getByTestId('right-arrow');

	// initially move to the right
	fireEvent.click(rightArrow);

	// move back to the left, expect the first image to show
	fireEvent.click(leftArrow);
	expect(
		queryByAltText('Photo by Richard Pasquarella on Unsplash')
	).toBeInTheDocument();
	expect(
		queryByAltText('Photo by Pratik Patel on Unsplash')
	).not.toBeInTheDocument();
});

// smoke test- CAROUSEL
it('rendeers the carousel', function () {
	render(<Carousel />);
});

// snapshot test - CAROUSEL
it('matches snapshot', function () {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

it('hides and shows arrows appropriately', function () {
	// render the component and select the elements to test
	const { getByTestId } = render(<Carousel />);
	const leftArrow = getByTestId('left-arrow');
	const rightArrow = getByTestId('right-arrow');

	// expect the left arrow to be missing if at index 0
	expect(leftArrow).toHaveClass('hidden');
	expect(rightArrow).not.toHaveClass('hidden');

	// move forward, expect both arrow to exist
	fireEvent.click(getByTestId('right-arrow'));
	// expect the left arrow to be missing, but the right button to be present.
	expect(leftArrow).not.toHaveClass('hidden');
	expect(rightArrow).not.toHaveClass('hidden');

	// move forward again, expect only the right arrow to be missing
	fireEvent.click(rightArrow);
	expect(leftArrow).not.toHaveClass('hidden');
	expect(rightArrow).toHaveClass('hidden');
});
