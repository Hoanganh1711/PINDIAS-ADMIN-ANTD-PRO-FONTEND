import { CompassOutlined, CrownOutlined, SmileOutlined, TabletOutlined } from '@ant-design/icons'
import logo from '../../public/img/logo-pindias-small.png'

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/welcome',
                name: 'Welcome',
                icon: <SmileOutlined />,
                component: './Welcome',
            },
            {
                path: '/admin',
                name: 'Admin',
                icon: <CrownOutlined />,
                access: 'canAdmin',
                component: './Admin',
                routes: [
                    {
                        path: '/admin/sub-page1',
                        name: 'sub-page1',
                        icon: <CrownOutlined />,
                        component: './Welcome',
                    },
                    {
                        path: '/admin/sub-page2',
                        name: 'sub-page 2',
                        icon: <CrownOutlined />,
                        component: './Welcome',
                    },
                    {
                        path: '/admin/sub-page3',
                        name: 'sub-page 3',
                        icon: <CrownOutlined />,
                        component: './Welcome',
                    },
                ],
            },
            {
                name: 'List',
                icon: <TabletOutlined />,
                path: '/list',
                component: './ListTableList',
                routes: [
                    {
                        path: '/list/sub-page',
                        name: 'Sub List Page',
                        icon: <CrownOutlined />,
                        routes: [
                            {
                                path: 'sub-sub-page1',
                                name: 'sub-sub-page1',
                                icon: <CrownOutlined />,
                                component: './Welcome',
                            },
                            {
                                path: 'sub-sub-page2',
                                name: 'sub-sub-page2',
                                icon: <CrownOutlined />,
                                component: './Welcome',
                            },
                            {
                                path: 'sub-sub-page3',
                                name: 'sub-sub-page3',
                                icon: <CrownOutlined />,
                                component: './Welcome',
                            },
                        ],
                    },
                    {
                        path: '/list/sub-page2',
                        name: 'sub list page2',
                        icon: <CrownOutlined />,
                        component: './Welcome',
                    },
                    {
                        path: '/list/sub-page3',
                        name: 'Sub List Page3',
                        icon: <CrownOutlined />,
                        component: './Welcome',
                    },
                ],
            },
            {
                path: 'https://vn.pindias.com/',
                name: 'Pindias Website',
                icon: <CompassOutlined />,
            },
        ],
    },
    location: {
        pathname: '/',
    },
}
