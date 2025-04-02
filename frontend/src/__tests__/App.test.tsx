import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Remove the BrowserRouter wrapper since App already includes Router
const renderApp = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  it('redirects to login page when accessing root path', () => {
    renderApp('/');
    // Use a data-testid to check for login component
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders login component on /login path', () => {
    renderApp('/login');
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
}); 