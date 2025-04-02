import axios from 'axios';

export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
}

class AuthService {
    private static instance: AuthService;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = import.meta.env.VITE_AUTH_URL || 'http://localhost:9000';
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public async loginWithGithub(): Promise<void> {
        window.location.href = `${this.baseUrl}/oauth2/authorization/github`;
    }

    public async loginWithGoogle(): Promise<void> {
        window.location.href = `${this.baseUrl}/oauth2/authorization/google`;
    }

    public async handleCallback(code: string): Promise<AuthResponse> {
        const response = await axios.post(`${this.baseUrl}/oauth2/token`, {
            code,
            grant_type: 'authorization_code',
            client_id: 'expense-tracker-client',
            redirect_uri: `${window.location.origin}/auth/callback`,
        });
        return response.data;
    }

    public async getCurrentUser(): Promise<User> {
        const response = await axios.get(`${this.baseUrl}/api/user/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        return response.data;
    }

    public logout(): void {
        localStorage.removeItem('access_token');
        window.location.href = '/';
    }
}

export const authService = AuthService.getInstance(); 