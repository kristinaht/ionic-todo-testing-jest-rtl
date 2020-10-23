import React from 'react';
import { render } from '@testing-library/react';
import Home, { Todo } from './Home';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';

function mockFetch(data: any) {
  return jest.spyOn(window, 'fetch').mockResolvedValue(new Response(JSON.stringify(data)));
}

beforeEach(() => mockFetch([]));

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

test('todos should be in the list when TodoList is loaded with todos', async () => {
  const todos: Todo[] = [
    { id: 1, text: 'review PR'},
    { id: 2, text: 'update docs'},
  ];

  mockFetch(todos);

  const { findByText } = render(<Home />);

  await findByText(todos[0].text);
  await findByText(todos[1].text);
});

test('should add a new todo when clicking the new button', async () => {
  const { findByTitle, findByText } = render(<Home />);
  const addButton = await findByTitle('Add Todo');
  fireEvent.click(addButton);

  const input = await findByTitle('Todo Text');
  const button = await findByText('Save');

  fireEvent.ionChange(input, 'test todo');
  fireEvent.click(button);
  await findByText('test todo');
});