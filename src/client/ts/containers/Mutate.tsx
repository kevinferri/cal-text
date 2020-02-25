import * as React from 'react';
import cache from '../lib/Cache';

type Body = { [x: string]: any };

interface IProps {
  children: (renderProps: IState) => any;
  uri: string;
  verb: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
}

interface IState {
  data: any | null;
  isLoading: boolean;
  mutate: (body: Body) => any;
}

export class Mutate extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: cache.get(this.props.uri) || null,
      isLoading: false,
      mutate: this.mutate,
    };
  }

  public render() {
    return this.props.children(this.state);
  }

  private mutate = async (body: Body) => {
    this.setState({ isLoading: true });

    const resp = await fetch(this.props.uri, {
      method: this.props.verb,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    this.setState(
      {
        isLoading: false,
        data,
      },
      () => {
        cache.set(this.props.uri, data);
      },
    );

    return data;
  };
}
