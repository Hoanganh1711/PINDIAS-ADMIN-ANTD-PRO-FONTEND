import {
    CompassOutlined,
    StopOutlined,
    DeleteOutlined,
    UnorderedListOutlined,
    PlusSquareOutlined,
    FileProtectOutlined,
    EditOutlined,
} from '@ant-design/icons'

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
                name: 'Drafts List',
                icon: <EditOutlined />,
            },
            {
                path: '/real-estate/rejected',
                name: 'Rejected List',
                icon: <StopOutlined />,
            },
            {
                path: '/real-estate/deleted',
                name: 'Deleted List',
                icon: <DeleteOutlined />,
            },
            {
                path: '/about',
                name: 'About',
                icon: <FileProtectOutlined />,
            },
            {
                path: 'https://pindias.com/',
                name: 'Pindias Website',
                icon: <CompassOutlined />,
            },
        ],
    },
    location: {
        pathname: '/',
    },
}
