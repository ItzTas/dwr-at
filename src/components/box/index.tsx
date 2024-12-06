import { Box, BoxProps } from '@mui/material';
import React from 'react';

export default function BoxComponent({
  children,
  ...props
}: BoxProps): React.JSX.Element {
  return <Box {...props}>{children}</Box>;
}
