import {
  Autocomplete,
  AutocompleteProps,
  styled,
  TextField,
} from '@mui/material';

const AutoCompleteTextField = styled(TextField)(({ theme }) => ({
  borderRadius: '10px',

  '& fieldset': {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
    borderRadius: '10px',
  },

  '& .MuiInputBase-input': {
    zIndex: 1,
  },

  '& .MuiSvgIcon-root ': {
    fill: theme.palette.primary.main,
  },

  '& .MuiInputLabel-root': {
    color: '#3d537c',
  },

  '& .MuiPaper-root': {
    borderRadius: '10px',
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },
}));

interface WrappedAutoCompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T | string, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
  > {
  renderInput?: AutocompleteProps<
    T | string,
    Multiple,
    DisableClearable,
    FreeSolo
  >['renderInput'];
  label?: string;
  name?: string;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
}

const WrappedAutoComplete = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  id,
  name,
  label,
  error,
  helperText,
  ...props
}: WrappedAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  return (
    <Autocomplete
      renderInput={(params) => (
        <AutoCompleteTextField
          {...params}
          label={label}
          fullWidth
          error={error}
          helperText={helperText}
          name={name}
        />
      )}
      noOptionsText={'Ничего не найдено'}
      {...props}
    />
  );
};

export default WrappedAutoComplete;
