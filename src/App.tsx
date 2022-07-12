import { Layout } from 'antd'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './config/routes'
import { Link } from '@/components'
import '@ant-design/pro-components/dist/components.css'

const { Content } = Layout

function App() {
    console.log('import.meta.env', import.meta.env.VITE_APP_NAME)
    const myRoutes = routes.map((item: any) => {
        console.log(item)

        return <Route key={item.path} {...item} element={<item.component />} />
    })
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Layout
                        style={{
                            minHeight: '100vh',
                        }}
                    >
                        <Layout className="site-layout">
                            <Content
                                style={{
                                    margin: '40px',
                                }}
                            >
                                <Link to="/">Home Page</Link>
                                <Link to="/about">About Page</Link>
                                <Routes>{myRoutes}</Routes>
                            </Content>
                        </Layout>
                    </Layout>
                </BrowserRouter>
            </Suspense>
        </>
    )
}

export default App
