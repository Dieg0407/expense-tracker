import { authService } from '../auth.service';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    describe('loginWithGithub', () => {
        it('should redirect to GitHub OAuth URL', () => {
            const mockLocation = { href: '' };
            Object.defineProperty(window, 'location', {
                value: mockLocation,
                writable: true,
            });

            authService.loginWithGithub();
            expect(window.location.href).toBe('http://localhost:9000/oauth2/authorization/github');
        });
    });

    describe('loginWithGoogle', () => {
        it('should redirect to Google OAuth URL', () => {
            const mockLocation = { href: '' };
            Object.defineProperty(window, 'location', {
                value: mockLocation,
                writable: true,
            });

            authService.loginWithGoogle();
            expect(window.location.href).toBe('http://localhost:9000/oauth2/authorization/google');
        });
    });

    describe('handleCallback', () => {
        it('should handle OAuth callback and return auth response', async () => {
            const mockResponse = {
                data: {
                    access_token: 'mock-token',
                    token_type: 'Bearer',
                    expires_in: 3600,
                    user: {
                        id: '1',
                        email: 'test@example.com',
                        name: 'Test User',
                        avatarUrl: 'https://example.com/avatar.jpg',
                    },
                },
            };

            vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);

            const result = await authService.handleCallback('mock-code');

            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:9000/oauth2/token',
                {
                    code: 'mock-code',
                    grant_type: 'authorization_code',
                    client_id: 'expense-tracker-client',
                    redirect_uri: `${window.location.origin}/auth/callback`,
                }
            );

            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('getCurrentUser', () => {
        it('should fetch current user data', async () => {
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                name: 'Test User',
                avatarUrl: 'https://example.com/avatar.jpg',
            };

            localStorage.setItem('access_token', 'mock-token');
            vi.mocked(axios.get).mockResolvedValueOnce({ data: mockUser });

            const result = await authService.getCurrentUser();

            expect(axios.get).toHaveBeenCalledWith(
                'http://localhost:9000/api/user/me',
                {
                    headers: {
                        Authorization: 'Bearer mock-token',
                    },
                }
            );

            expect(result).toEqual(mockUser);
        });
    });

    describe('logout', () => {
        it('should clear token and redirect to home', () => {
            const mockLocation = { href: '' };
            Object.defineProperty(window, 'location', {
                value: mockLocation,
                writable: true,
            });

            localStorage.setItem('access_token', 'mock-token');
            authService.logout();

            expect(localStorage.getItem('access_token')).toBeNull();
            expect(window.location.href).toBe('/');
        });
    });
}); 