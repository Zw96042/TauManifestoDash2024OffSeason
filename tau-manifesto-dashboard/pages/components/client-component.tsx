// components/client-component.tsx
import React, { Children, ReactNode } from 'react';
import { ClientComponent } from 'react-d3-library';

const ClientComponentWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClientComponent>
      {() => <React.Fragment>{children}</React.Fragment>}
    </ClientComponent>
  );
};

export const ClientComponentWithChildren = (props: any) => {
  return <ClientComponentWrapper {...props} />;
};