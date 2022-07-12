import { lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Layout = lazy(() => import('../components/Layout/LayoutComponent'))

const routes = [
    {
        path: '/home',
        exact: true,
        component: Home,
        name: 'Home',
    },
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Layout',
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
    },
    {
        path: '/about',
        component: About,
        name: 'About',
    },
    {
        path: '/404',
        component: NotFound,
    },
]
export default routes
