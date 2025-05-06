import { DashboardComponent } from "./components/dashboard.component";
import { LoginComponent } from "./components/login.component";
import { Router } from "./utils/router";

// Main application entry point
console.log('Expense Tracker Application Started');

// Initialize components
const app = document.getElementById('app');
if (!app)
    throw new Error('Root element not found');

new Router({
    rootElement: app,
    routes: [
        {
            path: '/',
            component: () => new LoginComponent().render()
        },
        {
            path: '/login',
            component: () => new LoginComponent().render()
        },
        {
            path: '/dashboard',
            component: () => new DashboardComponent().render(),
            isProtected: true
        }
    ]
});