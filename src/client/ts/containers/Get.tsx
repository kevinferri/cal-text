import * as React from 'react';
import cache from '../lib/Cache';

interface IProps {
  children: (renderProps: IState) => any;
  uri: string;
}

interface IState {
  isLoading: boolean;
  data: any | null;
}

export class Get extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
    };
  }

  public async componentDidMount() {
    const { uri } = this.props;

    if (cache.get(uri)) {
      this.setState({
        isLoading: false,
        data: cache.get(uri),
      });
    } else {
      const response = await fetch(uri, {
        headers: {
          Authorization:
            'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjVkYzcxZjEwNDcyZGVmMzIzNzk0ZDU0MSIsImdvb2dsZUlkIjoiMTE1NTgyOTg5NDA3NTc1NjE4MTU1IiwiZ29vZ2xlVG9rZW4iOiJ5YTI5LklsLXdCN1l5S3hlTXVCTzZnVmpidExjZHZWWHNENjZCUm9iNXVZUUNLMmFCdmFsX3ZLZmJ5NVhKM0R5SlRZNmFVcDhvOVBScFRRRlN4V2x6eEFYMldKRmtyWWZrQ0FuYWtIVS12VHYzMWNLTmN5RDE2UkExc0R2YlRZOF9CcUZOVXciLCJuYW1lIjoiS2V2aW4gRmVycmkiLCJlbWFpbCI6ImtldmluZmVycmlAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQXVFN21DX3BweGxNdEN1SHU4RWdSMHQzMXZFNzZLVXZ5ZllHUjYwTnNNM3dRIiwicGhvbmVOdW1iZXIiOiIxMjMxMjMxMjMxMjMxMjMiLCJfX3YiOjB9LCJpYXQiOjE1NzQzMTEzNTh9.DEXgNRnODV7n-SSx3F4_I3LFIJB9V-QrasialwxDRBY',
        },
      });

      const data = await response.json();

      this.setState(
        {
          isLoading: false,
          data,
        },
        () => {
          cache.set(uri, data);
          return data;
        },
      );
    }
  }

  public render() {
    return this.props.children(this.state);
  }
}
