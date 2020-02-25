import * as React from 'react';

interface IConfigContext {
  user: {
    name: string;
    location: string;
  } | null;
}

const defaultConfigContext: IConfigContext = {
  user: null,
};

export const ConfigContext = React.createContext(defaultConfigContext);
