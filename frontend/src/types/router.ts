export type Route = {
    path: string;
    component: () => void;
    isProtected?: boolean;
};

export type RouterConfig = {
    routes: Route[];
    rootElement: HTMLElement;
}; 