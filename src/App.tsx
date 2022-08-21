import { Suspense, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import routes from './config/routes'
// import { Link } from '@/components'
import '@ant-design/pro-components/dist/components.css'
import LayoutComponent from './components/Layout/LayoutComponent'

import { LikeOutlined, UserOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components'
import { Avatar, Button, Descriptions, Result, Space, Statistic } from 'antd'
import { useState } from 'react'
import defaultProps from './components/Layout/_defaultProps'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

const content = (
    <Descriptions size="small" column={2}>
        <Descriptions.Item label="创建人">张三</Descriptions.Item>
        <Descriptions.Item label="联系方式">
            <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
    </Descriptions>
)

function App() {
    const { params } = useParams()
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>()
    const [pathname, setPathname] = useState('/welcome')

    useEffect(() => {
        // window.location.pathname = pathname
    }, [])

    console.log('params', params);
    return (
        <>
            {/* <LayoutComponent /> */}

            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <div
                        id="test-pro-layout"
                        style={{
                            height: '100vh',
                        }}
                    >
                        <ProLayout
                            {...defaultProps}
                            location={{
                                pathname,
                            }}
                            menuFooterRender={props => {
                                return (
                                    <a
                                        style={{
                                            lineHeight: '48rpx',
                                            display: 'flex',
                                            height: 48,
                                            color: 'rgba(255, 255, 255, 0.65)',
                                            alignItems: 'center',
                                        }}
                                        href="https://pindias.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img
                                            alt="pro-logo"
                                            src="https://res.cloudinary.com/metawayholdings-logo/image/upload/v1657336244/Metaway%20Holdings%20Image/Logo_Meta_512px_gpfe6y.png"
                                            style={{
                                                width: 16,
                                                height: 16,
                                                margin: '0 16px',
                                                marginRight: 10,
                                            }}
                                        />
                                        {!props?.collapsed && 'Preview Pro'}
                                    </a>
                                )
                            }}
                            onMenuHeaderClick={e => console.log('tét', e)}
                            menuItemRender={(item, dom) => (
                                <span
                                    onClick={() => {
                                        console.log('asdasdasd', item.path);

                                        setPathname(item.path ? item.path : '/welcome')
                                    }}

                                >
                                    {
                                        item.path?.includes('https') ? (
                                            <a href={item.path} target={'_blank'}>{dom}</a>
                                        ) : (
                                            <Link to={`${item.path}`} >{dom}</Link>
                                        )
                                    }
                                </span>
                            )}
                            rightContentRender={() => (
                                <div>
                                    <Avatar shape="square" size="small" icon={<UserOutlined />} />
                                </div>
                            )}
                            {...settings}
                        >
                            <PageContainer
                                content={content}
                                tabList={[
                                    {
                                        tab: 'Basic Information',
                                        key: 'base',
                                    },
                                    {
                                        tab: 'Detail Information',
                                        key: 'info',
                                    },
                                ]}
                                extraContent={
                                    <Space size={24}>
                                        <Statistic
                                            title="Feedback"
                                            value={1128}
                                            prefix={<LikeOutlined />}
                                        />
                                        <Statistic title="Unmerged" value={93} suffix="/ 100" />
                                    </Space>
                                }
                                extra={[
                                    <Button key="3">Action</Button>,
                                    <Button key="2">Action</Button>,
                                    <Button key="1" type="primary">
                                        Main Operation
                                    </Button>,
                                ]}
                                footer={[
                                    <Button key="3">Reset</Button>,
                                    <Button key="2" type="primary">
                                        Submit
                                    </Button>,
                                ]}
                            >


                                <div
                                    style={{
                                        height: '100vh',
                                    }}
                                >
                                    <Routes >
                                        <Route path={'/'} element={<Home />} />
                                        <Route path={'/welcome'} element={<Home />} />
                                        <Route path={'/about'} element={<About />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </div>
                            </PageContainer>
                        </ProLayout>
                        <SettingDrawer
                            
                            pathname={pathname}
                            enableDarkTheme
                            getContainer={() => document.getElementById('test-pro-layout')}
                            settings={settings}
                            onSettingChange={changeSetting => {
                                setSetting(changeSetting)
                            }}
                            disableUrlParams={false}
                        />
                    </div>
                </BrowserRouter>
            </Suspense>
        </>
    )
}

export default App
