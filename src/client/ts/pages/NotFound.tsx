import * as React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import '../../scss/components/Content.scss';

export const NotFound = () => {
  return (
    <Content className="Content">
      <h1>404 page not found</h1>
    </Content>
  );
};
