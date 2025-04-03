export interface NavigationEvent extends CustomEvent {
    detail: {
        path: string;
    };
}

export const NAVIGATION_EVENT = 'app-navigation'; 