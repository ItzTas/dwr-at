import { TextField, TextFieldProps } from '@mui/material';

export default function TextFieldComponent(
  props: TextFieldProps,
): React.JSX.Element {
  const { variant = 'outlined' } = props;

  return (
    <TextField
      className={`general-textfield ${props.className ? props.className : ''}`}
      variant={variant}
      {...props}
    />
  );
}
