import { Container, ContainerProps } from '@mui/material';

export default function ContainerComponent({
    children,
    ...props
}: ContainerProps): React.JSX.Element {
    return <Container {...props}>{children}</Container>;
}
