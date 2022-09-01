import { InputProps } from '@mui/material';
import React from 'react';
import { isNotEmpty } from '../../../support/utils';
import { Box, TextField } from '../../elements';

export interface AuthResponseErrors {
  Register: string[];
  Nickname: string[];
  Email: string[];
  RepeatEmail: string[];
  Password: string[];
  RepeatPassword: string[];
  Confirmation: string[];
  Login: string[];
}

export interface RegisterInputFieldProps {
  value: string;
  label: string;
  error: boolean;
  autofocus?: boolean;
  errorText: string;
  responseErrors?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  ref?: React.ForwardedRef<HTMLInputElement>;
  type?: 'text' | 'password';
  inputProps?: Partial<InputProps>;
}

export const RegisterInputField: React.FC<RegisterInputFieldProps> = React.forwardRef((props, ref) => {
  const errorTextIsNotEmpty = isNotEmpty(props.errorText);
  const responseErrorsHasValues = (props.responseErrors && props.responseErrors.length > 0) ?? false;
  return (
    <TextField
      inputRef={ref}
      size="small"
      required
      label={props.label}
      type={props.type}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        margin: 1,
      }}
      autoFocus={props.autofocus}
      value={props.value}
      onChange={props.onChange}
      error={props.error}
      FormHelperTextProps={{ component: 'div', style: { marginTop: '0px' } } as never}
      InputProps={props.inputProps}
      helperText={
        (errorTextIsNotEmpty || responseErrorsHasValues) && (
          <Box component="ul" sx={{ paddingInlineStart: 2, marginTop: '0px', marginBlockEnd: '0px' }}>
            {errorTextIsNotEmpty && (
              <Box component="li" sx={{ color: (theme) => theme.palette.warning.dark }}>
                {props.errorText}
              </Box>
            )}
            {responseErrorsHasValues &&
              props.responseErrors?.map((value, index) => (
                <Box component="li" sx={{ color: (theme) => theme.palette.error.light }} key={index}>
                  {value}
                </Box>
              ))}
          </Box>
        )
      }
    />
  );
});
