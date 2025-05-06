import { AuthService } from "@/services/auth.service";
import { NAVIGATION_EVENT } from "@/types/events";

export class LoginComponent {
    private submitHandler: (e: SubmitEvent) => void;

    constructor() {
        this.submitHandler = (e: SubmitEvent) => {
            e.preventDefault();
            AuthService.login();
            const event = new CustomEvent(NAVIGATION_EVENT, {
                detail: {
                    path: '/dashboard'
                }
            });

            this.detachEventListeners();
            window.dispatchEvent(event);
        };
    }

    public render(): void {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <div class="login-container">
                <h1>Login</h1>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;

        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        const form = document.getElementById('loginForm');
        if (!form) return;

        form.addEventListener('submit', this.submitHandler);
    }

    private detachEventListeners(): void {
        const form = document.getElementById('loginForm');
        if (!form) return;

        form.removeEventListener('submit', this.submitHandler);
    }
} 