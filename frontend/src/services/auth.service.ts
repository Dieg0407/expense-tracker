export class AuthService {
    private static TOKEN_KEY = 'expense_tracker_token';

    static isAuthenticated(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    static login(): void {
        localStorage.setItem(this.TOKEN_KEY, 'dummy_token');
    }

    static logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }
}