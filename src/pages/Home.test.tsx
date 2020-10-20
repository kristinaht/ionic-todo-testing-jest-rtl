import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('page should have a title of Ionic React Todos', async () => {
  const { findByText } = render(<Home />);
  await findByText('Ionic React Todos');
});

//render method takes our component and returns a bunch of helper methods to aid us in selecting pieces of teh DOM that was rendered. 
//The findByText method is one of them. It looks for a n element that contains the text passed into it. If it doesn't find one of if it finds more thann one, it throws an error.

test('page should render no todos message when there are no todos', async () => {
  const { findByText } = render(<Home />);
  await findByText('No todos, add some!')
});