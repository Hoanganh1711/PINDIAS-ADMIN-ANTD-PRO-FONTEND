import { Suspense, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import '@ant-design/pro-components/dist/components.css'
import './App.css'
import logo from './public/img/logo-pindias-small.png'

import { UserOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components'
import { Avatar, Breadcrumb, Descriptions, message } from 'antd'
import { useState } from 'react'
import defaultProps from './config/Routes/_defaultProps'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import RealEstateAllList from './components/RealEstateManagement/RealEstateAllList'
import { useSelector } from 'react-redux'
import { usePageVisibility } from './Hooks/TabChangeHelper'
import { tokenExpiredHandler } from './Hooks/fetchHandler'
import Cookies from 'universal-cookie'
import HeaderComponent from './components/Layout/HeaderComponent'
import RejectedList from './components/RealEstateManagement/RejectedList'
import FooterComponent from './components/Layout/FooterComponent'
import DraftList from './components/RealEstateManagement/DraftList'
import Test from './components/RealEstateManagement/Test'

function App() {
    const [pathname, setPathname] = useState('/real-estate/all')
    const cookies = new Cookies()
    // const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(false)
    // const isAdmin = useSelector(isAdminSelector);
    const [actions, setActions] = useState()
    const isBrowserTabChanged = usePageVisibility()

    useEffect(() => {
        const accessToken = cookies.get('accessToken')
        if (accessToken && accessToken != 'undefined') {
            // Logged in
            setIsLogin(true)
        } else {
            // if not logged in, redirect to login url
            tokenExpiredHandler()
        }
    }, [isBrowserTabChanged])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token: any = params.get('token')
        const continueUrl: any = params.get('continue')
        if (token) {
            const currentTime = new Date().getTime()
            // get 7 days later
            const sevenDaysLater = new Date(currentTime + 7 * 24 * 60 * 60 * 1000)
            const local = window.location.href.includes('localhost')
            if (local) {
                cookies.set('accessToken', token, { path: '/', expires: sevenDaysLater })
            } else {
                cookies.set('accessToken', token, {
                    path: '/',
                    domain: '.pindias.com',
                    expires: sevenDaysLater,
                })
            }
            cookies.set('showLoggedInMessage', '1stTrue', { path: '/' })
            if (continueUrl) {
                window.location.href = continueUrl
            } else {
                // move to home page
                window.location.href = '/'
            }
        }
    }, [])

    useEffect(() => {
        const showLoggedInMessage = cookies.get('showLoggedInMessage')
        if (showLoggedInMessage === '1stTrue') {
            cookies.set('showLoggedInMessage', '2ndTrue', { path: '/' })
        } else if (showLoggedInMessage === '2ndTrue') {
            message.success('You are logged in!')
            cookies.set('showLoggedInMessage', 'false', { path: '/' })
        }
    }, [])
    const [uri] = window.location.href.split('#')

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <div
                        id="main-pro-layout"
                        style={{
                            height: '100vh',
                        }}
                    >
                        <ProLayout
                            navTheme="light"
                            fixSiderbar={true}
                            {...defaultProps}
                            location={{
                                pathname,
                            }}
                            pageTitleRender={(item: any, dom) => {
                                return dom === ''
                                    ? 'Pindias - Real Estate Management'
                                    : dom + ' | Agent - Pindias'
                            }}
                            menuItemRender={(item, dom) => (
                                <span
                                    onClick={() => {
                                        console.log('item.path', item.path)

                                        setPathname(item.path ? item.path : '/welcome')
                                    }}
                                >
                                    {item.path?.includes('https') ? (
                                        <a href={item.path} target={'_blank'}>
                                            {dom}
                                        </a>
                                    ) : (
                                        <Link to={`${item.path}`}>{dom}</Link>
                                    )}
                                </span>
                            )}
                            breadcrumbRender={(routers: any) => [
                                {
                                    path: '/',
                                    breadcrumbName: 'Home',
                                },
                                ...routers,
                            ]}
                            itemRender={(route, params, routes, paths) => {
                                const first = routes.indexOf(route) === 0
                                return first ? (
                                    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                                ) : (
                                    <span>{route.breadcrumbName}</span>
                                )
                            }}
                            menuHeaderRender={() => (
                                <Link to="/">
                                    <img className="pindias-logo-img" alt="logo" src={logo} />
                                    <h1 className="pindias-logo-text">Pindias</h1>
                                </Link>
                            )}
                            onMenuHeaderClick={e => console.log('tét', e)}
                            rightContentRender={() => (
                                <div>
                                    <HeaderComponent />
                                </div>
                            )}
                        >
                            <PageContainer>
                                <Routes>
                                    <Route path="/" element={<RealEstateAllList />} />
                                    <Route
                                        path="/real-estate/all"
                                        element={<RealEstateAllList />}
                                    />
                                    <Route
                                        path="/real-estate/rejected"
                                        element={<RejectedList />}
                                    />
                                    {/* <Route path="/real-estate/create" element={<CreateNew />} /> */}
                                    {/* <Route
                                            path="/real-estate/demo-view/:id"
                                            element={<RealEstateDetails />}
                                        /> */}
                                    {/* <Route
                                            path="/real-estate/edit/:id"
                                            element={<EditRealEstateInfo />}
                                        /> */}
                                    <Route path="/real-estate/drafts" element={<DraftList />} />
                                    <Route path="/test" element={<Test />} />
                                    <Route path="*" element={<NotFound />} />
                                    <Route path="*" element={<NotFound />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                                <FooterComponent />
                            </PageContainer>
                        </ProLayout>
                    </div>
                </BrowserRouter>
            </Suspense>
        </>
    )
}

export default App
