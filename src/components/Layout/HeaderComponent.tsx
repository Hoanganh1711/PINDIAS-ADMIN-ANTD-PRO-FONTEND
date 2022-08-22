import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Badge,
    Button,
    Card,
    Col,
    Divider,
    Dropdown,
    Layout,
    Menu,
    message,
    Row,
    Space,
    Image,
} from 'antd'
import { LogoutOutlined, GlobalOutlined, BellOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { fetchUserInformation } from '../../service/userInformation'
import { useDispatch } from 'react-redux'
import { setAccountInfo, setIsUser } from '../../service/connectionSlice'
import i18next, { t } from 'i18next'
import vietnamFlag from '../../public/img/vietnam-flag.png'
import englishFlag from '../../public/img/united-kingdom-flag.png'
import { useTranslation } from 'react-i18next'
import avatar from '../../public/img/purple-user-avatar.png'

const { Content, Header } = Layout

function HeaderComponent() {
    // const { t } = useTranslation()
    // const dispatch = useDispatch()
    const cookies = new Cookies()
    const [userName, setuserName] = useState('Name not updated')
    const [userEmail, setuserEmail] = useState('')
    const [userPhone, setuserPhone] = useState('')
    const [userRole, setuserRole] = useState('User')

    useEffect(() => {
        getUserInformation()
    }, [])

    const lngs: any = {
        vi: { nativeName: t('vietnamese'), flag: vietnamFlag },
        en: { nativeName: t('english'), flag: englishFlag },
    }

    const getUserInformation = async () => {
        const response = await fetchUserInformation()
        if (response) {
            if (response.status === 200) {
                // dispatch(setAccountInfo(response.data))
                const name = `${response.data.firstName && response.data.firstName + ' '}${
                    response.data.lastName && response.data.lastName
                }`
                if (name) setuserName(name)
                if (response.data.email) setuserEmail(response.data.email)
                if (response.data.phone) setuserPhone(response.data.phone)
                if (response.data.accountRole === 'USER') {
                    // dispatch(setIsUser(true))
                    setuserRole('User')
                } else if (response.data.accountRole === 'ADMIN') {
                    location.assign('https://lux.pindias.com/')
                }
            } else {
                message.error(response.data)
            }
        } else {
            message.error('Get user information failed')
        }
    }

    const handleLogout = () => {
        const local = window.location.href.includes('localhost')
        if (local) {
            cookies.remove('accessToken', { path: '/' })
        } else {
            cookies.remove('accessToken', { path: '/', domain: '.pindias.com' })
        }
        message
            .loading('Logging out..', 1)
            .then(() => message.success('You are logged out', 1))
            .then(() => (window.location.href = '/'))
    }

    const menu = (
        <Menu id="header-menu-dropdown">
            <Menu.Item key={1}>
                <div>
                    <Row justify="center">
                        <Col>
                            <div className="my-3">
                                <Avatar
                                    className="avatarIcon"
                                    src={avatar}
                                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 80 }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>{' '}
            </Menu.Item>
            <Menu.Item key={2}>
                <div>
                    <Row>
                        <Col span={24}>
                            <div className="d-flex justify-content-center mt-4">
                                <h5>{userName}</h5>
                            </div>
                            <div className="d-flex justify-content-center">
                                <span>{userEmail}</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Menu.Item>
            <Menu.Item key={3}>
                <div>
                    <Row>
                        <Col span={24}>
                            <div className="d-flex justify-content-center">
                                <Button
                                    href="https://myaccount.metawayholdings.com/"
                                    className="fw-bold account-manager"
                                    target={'_blank'}
                                >
                                    account-management
                                    {/* {t('account-management')} */}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Divider className="my-4" />
                </div>{' '}
            </Menu.Item>

            <Menu.Item key={4}>
                <div className="d-flex justify-content-center">
                    <Button className="fw-bold btn-logout" onClick={handleLogout}>
                        <LogoutOutlined />
                        sign-out
                        {/* <span>{t('sign-out')}</span> */}
                    </Button>
                </div>{' '}
            </Menu.Item>
            <Menu.Item key={5}>
                <div>
                    <Row>
                        <Divider className="my-4" />
                        <Col span={24}>
                            <div className="d-flex justify-content-between mx-2 my-3">
                                <Link className="fw-normal" to={'/'}>
                                    Privacy Policy
                                </Link>
                                <Link className="fw-normal" to={'/'}>
                                    Terms of Service
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>{' '}
            </Menu.Item>
        </Menu>
    )

    const locale = (
        <Menu defaultSelectedKeys={['0']}>
            {Object.keys(lngs).map((lng, index) => (
                <Menu.Item key={index}>
                    <Image src={lngs[lng].flag} width={19} />
                    <a
                        type="submit"
                        key={lng}
                        onClick={() => i18next.changeLanguage(lng)}
                        style={i18next.language === lng ? { borderBottom: '1px solid blue' } : {}}
                    >
                        {lngs[lng].nativeName}
                    </a>
                </Menu.Item>
            ))}
        </Menu>
    )

    return (
        // <Row>
        // <Col span={24}>
        <Space>
            <Dropdown
                // className="d-flex justify-content-center align-items-center"
                overlay={locale}
                trigger={['click']}
                autoFocus={lngs.vn}
                placement="bottom"
                arrow
            >
                <Link to="/" className="multi-language">
                    <GlobalOutlined
                        style={{ fontSize: '25px' }}
                        className="global-translate-icon"
                    />
                </Link>
            </Dropdown>
            <Dropdown
                // className="d-flex justify-content-center align-items-center"
                overlay={menu}
                trigger={['click']}
                placement="bottomRight"
            >
                <Avatar
                    className="avatarIcon"
                    src={avatar}
                    // size={{ xs: 10, sm: 30, md: 20, lg: 20, xl: 25, xxl: 30 }}
                />
            </Dropdown>
        </Space>
        //     </Col>
        // </Row>
    )
}

export default HeaderComponent
