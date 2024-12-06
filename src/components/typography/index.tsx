import { Typography, TypographyProps } from '@mui/material';

export default function TextComponent({
    children,
    ...props
}: TypographyProps): React.JSX.Element {
    return <Typography {...props}>{children}</Typography>;
}
