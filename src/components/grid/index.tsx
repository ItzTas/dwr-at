import { Grid, GridProps } from '@mui/material';

export default function GridComponent({
  children,
  ...props
}: GridProps): React.JSX.Element {
  return <Grid {...props}>{children}</Grid>;
}
