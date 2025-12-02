export enum Routes {
    ABOUT = '/about',
    MISSION = '/mission',
    PODCAST = '/podcast',
}

export const NavigationLabels: Record<Routes, string> = {
    [Routes.ABOUT]: 'About Us',
    [Routes.MISSION]: 'Mission',
    [Routes.PODCAST]: 'Podcast',
};

export const NavigationColors: Record<Routes, 'green' | 'purple' | 'red' | 'orange'> = {
    [Routes.MISSION]: 'green',
    [Routes.ABOUT]: 'purple',
    [Routes.PODCAST]: 'red',
};

export const NavigationTuple = [
    Routes.MISSION,
    Routes.ABOUT,
    Routes.PODCAST,
];