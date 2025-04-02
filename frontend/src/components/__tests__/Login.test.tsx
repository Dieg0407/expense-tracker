import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Login from '../Login';
import { authService } from '../../services/auth.service';

vi.mock('../../services/auth.service', () => ({
  authService: {
    loginWithGithub: vi.fn(),
    loginWithGoogle: vi.fn(),
  },
}));

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login buttons', () => {
    render(<Login />);
    
    expect(screen.getByTestId('github-login-button')).toBeInTheDocument();
    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
  });

  it('calls loginWithGithub when GitHub button is clicked', () => {
    render(<Login />);
    
    const githubButton = screen.getByTestId('github-login-button');
    fireEvent.click(githubButton);
    
    expect(authService.loginWithGithub).toHaveBeenCalledTimes(1);
  });

  it('calls loginWithGoogle when Google button is clicked', () => {
    render(<Login />);
    
    const googleButton = screen.getByTestId('google-login-button');
    fireEvent.click(googleButton);
    
    expect(authService.loginWithGoogle).toHaveBeenCalledTimes(1);
  });
}); 