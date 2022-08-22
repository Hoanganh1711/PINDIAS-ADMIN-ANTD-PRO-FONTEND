import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import enUSIntl from 'antd/lib/locale/en_US';
import viVNIntl from 'antd/lib/locale/vi_VN';
import { ConfigProvider } from 'antd';

const currentLanguage = localStorage.getItem("i18nextLng");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={currentLanguage === "vi" ? viVNIntl : enUSIntl}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)