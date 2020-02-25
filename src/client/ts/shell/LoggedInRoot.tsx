import * as React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Avatar, Icon, Layout, Spin } from 'antd';
import { Cal } from '../pages/Cal';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Get } from '../containers/Get';
const { Content, Footer, Header, Sider } = Layout;

// Styles
import 'antd/dist/antd.css';
import '../../scss/root.scss';
import '../../scss/components/Content.scss';
import '../../scss/components/Footer.scss';
import '../../scss/components/Header.scss';
import '../../scss/components/Layout.scss';
import '../../scss/components/Sider.scss';

export const LoggedInRoot = () => {
  return (
    <Get uri="/api/me">
      {({ data, isLoading }) => {
        if (isLoading) {
          return <Spin size="large" />;
        }

        return (
          <Layout className="Layout">
            <Header className="Header">
              <NavLink exact to="/">
                <span className="Header__brand-link">CalText</span>
              </NavLink>
              <div className="Header__right-links">
                <a href="#" className="Header__link">
                  <Avatar src={data.picture} />
                </a>
                <a className="Header__link" href="/auth/sign_out">
                  <span>Sign out</span>
                </a>
              </div>
            </Header>
            <Layout className="Layout">
              <Sider className="Sider">
                <NavLink
                  exact
                  activeClassName="Sider__link--active"
                  className="Sider__link"
                  to="/"
                >
                  <Icon className="Sider__link__icon" type="home" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  exact
                  activeClassName="Sider__link--active"
                  className="Sider__link"
                  to="/cal"
                >
                  <Icon className="Sider__link__icon" type="profile" />
                  <span>Cal</span>
                </NavLink>
              </Sider>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Home {...props} user={data} />}
                />
                <Route exact path="/cal" component={Cal} />
                <Route component={NotFound} />
              </Switch>
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
      }}
    </Get>
  );
};
