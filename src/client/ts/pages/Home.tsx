import * as React from 'react';
import { Alert, Input, Layout } from 'antd';
const { Content } = Layout;
import '../../scss/components/Content.scss';
import { Mutate } from '../containers/Mutate';

interface IProps {
  user: {
    id: string;
    name: string;
    picture: string;
    phoneNumber: string;
    isVerified: boolean;
  };
}

interface IState {
  hasSubmitted: boolean;
  phoneNumber: string | null;
}

export class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasSubmitted: false,
      phoneNumber: null,
    };
  }

  public render() {
    const { user } = this.props;
    const { hasSubmitted } = this.state;

    return (
      <Mutate uri="api/me/verify" verb="POST">
        {({ mutate }) => {
          return (
            <Content className="Content">
              <h1>Welcome, {user.name.trim().split(' ')[0]}</h1>
              <br />
              {user.isVerified ? (
                <div>
                  <h3>
                    Right now we will send confirmations to{' '}
                    <b>{user.phoneNumber}</b>. If you would like to update your
                    number, you can edit it below.
                  </h3>
                  <br />
                  <Input.Search
                    placeholder="Phone number"
                    enterButton="Update number"
                    size="large"
                    onSearch={(value: string) => console.log(value)}
                  />
                </div>
              ) : (
                <div>
                  {hasSubmitted ? (
                    <Alert
                      showIcon
                      message={`We sent a verification code to ${
                        this.state.phoneNumber
                      }`}
                      type="success"
                    />
                  ) : (
                    <Alert
                      showIcon
                      message={`We still need to verify your phone number. Please enter it below and we will send you a verification code.`}
                      type="warning"
                    />
                  )}
                  <br />
                  <Input.Search
                    placeholder="Phone number"
                    enterButton="Submit"
                    onSearch={async (phoneNumber: string) => {
                      const data = await mutate({ phoneNumber });
                      this.setState({
                        hasSubmitted: true,
                        phoneNumber: data.phoneNumber,
                      });
                    }}
                  />
                </div>
              )}
            </Content>
          );
        }}
      </Mutate>
    );
  }
}
