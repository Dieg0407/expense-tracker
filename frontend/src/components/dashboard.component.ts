import { AuthService } from "@/services/auth.service";
import { NAVIGATION_EVENT } from "@/types/events";

export class DashboardComponent {

    constructor() {
    }

    public render(): void {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <div class="dashboard-container">
                <header class="dashboard-header">
                    <h1>Dashboard</h1>
                    <button id="logoutBtn">Logout</button>
                </header>
                <main class="dashboard-content">
                    <div id="summary-container">
                        <summary-component id="summary-1"></summary-component>
                    </div>
                </main>
            </div>
        `;

        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        const logoutBtn = document.getElementById('logoutBtn');
        if (!logoutBtn)
            return;

        logoutBtn.addEventListener('click', () => this.logOut());
    }

    private logOut(): void {
        AuthService.logout();
        const event = new CustomEvent(NAVIGATION_EVENT, {
            detail: {
                path: '/login'
            }
        });
        window.dispatchEvent(event);
    }
} 