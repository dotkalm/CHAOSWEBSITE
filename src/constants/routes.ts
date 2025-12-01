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

export const NavigationTuple = [
    Routes.MISSION,
    Routes.ABOUT,
    Routes.PODCAST,
    Routes.CONTACT,
];