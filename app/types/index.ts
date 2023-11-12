export interface MenuItem {
    href: string;
    icon: React.JSX.Element;
    label: string;
}

export interface NewUserRequest {
    name: string;
    email: string;
    password: string;
}