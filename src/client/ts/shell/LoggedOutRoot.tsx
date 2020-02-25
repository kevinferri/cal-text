import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Icon, Layout } from 'antd';
const { Content, Footer, Header } = Layout;

// Styles
import 'antd/dist/antd.css';
import '../../scss/root.scss';
import '../../scss/components/Content.scss';
import '../../scss/components/Footer.scss';
import '../../scss/components/Header.scss';
import '../../scss/components/Layout.scss';

export const LoggedOutRoot = () => {
  return (
    <Layout className="Layout">
      <Header className="Header">
        <NavLink exact to="/">
          <span className="Header__brand-link">CalText</span>
        </NavLink>
        <div className="Header__right-links">
          <a href="/auth/google" className="Header__link">
            <Avatar icon="user" />
          </a>
          <a className="Header__link" href="/auth/google">
            <span>Sign in</span>
          </a>
        </div>
      </Header>
      <Layout className="Layout">
        <Content className="Content">
          <p>Text to save events in your Google calendar</p>
          <a href="/auth/google">
            <Button size="large" type="primary">
              <Icon type="google" />
              <span>Sign in with Google</span>
            </Button>
          </a>
        </Content>
      </Layout>
      <Footer className="Footer">
        <div className="Footer__block">
          <NavLink exact className="Footer__block" to="/about">
            <span>About</span>
          </NavLink>
        </div>
        <div className="Footer__block">
          <NavLink exact className="Footer__block" to="/terms">
            <span>Terms</span>
          </NavLink>
        </div>
        <div className="Footer__block">
          <NavLink exact className="Footer__block" to="/privacy">
            <span>Privacy</span>
          </NavLink>
        </div>
        <div className="Footer__pull-right">
          <div className="Footer__block">&copy; 2019 CalText</div>
          <div className="Footer__block">
            Made with <Icon type="code" /> in NYC
          </div>
        </div>
      </Footer>
    </Layout>
  );
};
