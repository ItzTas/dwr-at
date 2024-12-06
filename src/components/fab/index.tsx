import { Fab, FabProps } from '@mui/material';

export default function FabComponent({
    children,
    ...props
}: FabProps): React.JSX.Element {
    return <Fab {...props}>{children}</Fab>;
}
