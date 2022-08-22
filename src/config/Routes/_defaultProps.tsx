import {
    CompassOutlined,
    CrownOutlined,
    HomeOutlined,
    TabletOutlined,
    UnorderedListOutlined,
    PlusSquareOutlined,
} from '@ant-design/icons'
import logo from '../../public/img/logo-pindias-small.png'
import About from '../../pages/About'
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'
const page_title = 'Pindias - Agent |'

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/real-estate/all',
                name: 'Real Estate All List',
                icon: <UnorderedListOutlined />,
            },
            {
                path: '/real-estate/create',
                name: 'Create New Real Estate',
                icon: <PlusSquareOutlined />,
            },
            {
                path: '/real-estate/drafts',
                name: 'Real Estate All List',
                icon: <HomeOutlined />,
            },
            {
                path: '/real-estate/rejected',
                name: 'Real Estate All List',
                icon: <HomeOutlined />,
            },
            {
                path: '/about',
                name: 'About',
                page: page_title,
                icon: <CrownOutlined />,
                // access: 'canAdmin',
                routes: [
                    {
                        path: '/admin/sub-page1',
                        name: 'sub-page1',
                        icon: <CrownOutlined />,
                    },
                    {
                        path: '/admin/sub-page2',
                        name: 'sub-page 2',
                        icon: <CrownOutlined />,
                    },
                    {
                        path: '/admin/sub-page3',
                        name: 'sub-page 3',
                        icon: <CrownOutlined />,
                    },
                ],
            },
            {
                path: 'https://pindias.com/',
                name: 'Pindias Website',
                icon: <CompassOutlined />,
                component: <NotFound />,
            },
        ],
    },
    location: {
        pathname: '/',
    },
}
