export enum Routes {
    ABOUT = '/about',
    CONTACT = '/contact',
    MISSION = '/mission',
    PODCAST = '/podcast',
}

export const NavigationLabels: Record<Routes, string> = {
    [Routes.ABOUT]: 'About Us',
    [Routes.CONTACT]: 'Contact Us',
    [Routes.MISSION]: 'Mission',
    [Routes.PODCAST]: 'Podcast',
};

export const NavigationColors: Record<Routes, 'green' | 'purple' | 'red' | 'orange'> = {
    [Routes.MISSION]: 'green',
    [Routes.ABOUT]: 'purple',
    [Routes.PODCAST]: 'red',
    [Routes.CONTACT]: 'orange',
};

export const NavigationTuple = [
    Routes.MISSION,
    Routes.ABOUT,
    Routes.PODCAST,
    Routes.CONTACT,
];