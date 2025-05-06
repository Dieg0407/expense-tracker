import { RouterConfig, Route } from '../types/router';
import { AuthService } from '../services/auth.service';
import { NAVIGATION_EVENT, NavigationEvent } from '@/types/events';

export class Router {
    private routes: Route[];
    private rootElement: HTMLElement;

    constructor(config: RouterConfig) {
        this.routes = config.routes;
        this.rootElement = config.rootElement;

        // Handle browser back/forward buttons
        window.addEventListener(NAVIGATION_EVENT, (event) => {
            const navigationEvent = event as NavigationEvent;
            window.history.pushState({}, '', navigationEvent.detail.path);
            this.handleRoute();
        });
        window.addEventListener('popstate', () => this.handleRoute());

        // Handle initial route
        this.handleRoute();
    }

    private handleRoute(): void {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path) ||
            this.routes.find(r => r.path === '/');

        if (!route) {
            console.error('Route not found');
            return;
        }

        if (route.isProtected && !AuthService.isAuthenticated()) {
            this.navigate('/login');
            return;
        }

        // Clear the root element
        this.rootElement.innerHTML = '';

        // Render the component
        route.component();
    }

    public navigate(path: string): void {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }
} 