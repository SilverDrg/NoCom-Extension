import React from 'react';
import { Fade, Tooltip } from '@mui/material';

type GeneralTooltipProps = {
  title: string;
  children: React.ReactElement<any, any>;
};

export const GeneralTooltip = (props: GeneralTooltipProps) => {
  const { title, children } = props;

  return (
    <Tooltip
      title={title}
      enterDelay={200}
      leaveDelay={200}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
      disableInteractive={true}
    >
      {children}
    </Tooltip>
  );
};
