import { HomePage } from '../components/Home/HomePage';
import { SearchPage } from '../components/SearchPage/SearchPage';
import { DetailsPage } from '../components/DetailsPage/DetailsPage';
import { NotFound } from '../components/NotFound/NotFound';

export const routes = [
    {
        path: '/',
        Component: HomePage,
        exact: true,
    },
    {
        path: '/movies',
        Component: SearchPage,
        exact: true,
    },
    {
        path: '/movies/:id',
        Component: DetailsPage,
    },
    {
        path: '/tvseries',
        Component: SearchPage,
        exact: true,
    },
    {
        path: '/tvseries/:id',
        Component: DetailsPage,
    },
    {
        path: '*',
        Component: NotFound
    }
]

