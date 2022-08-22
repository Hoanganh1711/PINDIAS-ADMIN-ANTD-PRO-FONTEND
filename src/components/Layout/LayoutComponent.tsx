import { LikeOutlined, UserOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components'
import { Avatar, Button, Descriptions, Result, Space, Statistic } from 'antd'
import { useState } from 'react'
import defaultProps from '../../config/Routes/_defaultProps'

const content = (
    <Descriptions size="small" column={2}>
        <Descriptions.Item label="Creator">NguyenCongJP</Descriptions.Item>
        <Descriptions.Item label="Contact information">
            <a>123456789</a>
        </Descriptions.Item>
        <Descriptions.Item label="Creation time">2022-07-12</Descriptions.Item>
        <Descriptions.Item label="Update time">2022-07-12</Descriptions.Item>
        <Descriptions.Item label="Address">Hanoi, Vietnam</Descriptions.Item>
    </Descriptions>
)

function Layout() {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true })
    const [pathname, setPathname] = useState('/welcome')
    return (
        <>
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
                                href="https://vn.pindias.com/"
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
                    onMenuHeaderClick={e => console.log(e)}
                    menuItemRender={(item, dom) => (
                        <a
                            onClick={() => {
                                setPathname(item.path || '/welcome')
                            }}
                        >
                            {dom}
                        </a>
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
                                height: '120vh',
                            }}
                        >
                            <Result
                                status="404"
                                style={{
                                    height: '100%',
                                    background: '#fff',
                                }}
                                title="Hello World"
                                subTitle="Sorry, you are not authorized to access this page."
                                extra={<Button type="primary">Back Home</Button>}
                            />
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
        </>
    )
}

export default Layout
