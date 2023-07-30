import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';

type Option = {
  value: string;
  label: string;
};

interface Props {
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

const SingleSelect: React.FC<Props> = ({ options, value, onChange }) => (
  <FormControl fullWidth>
    <InputLabel id="doctor-label">Врач</InputLabel>
    <MuiSelect
      labelId="doctor-label"
      id="doctor-select"
      label="Врач"
      value={value}
      onChange={onChange}
      required
      sx={{
        width: '100%',
        height: '67px',
        borderRadius: '10px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

        '& fieldset': {
          borderColor: ({ palette }) => palette.primary.main,
          borderWidth: '2px',
          borderRadius: '10px',
        },

        '.MuiSvgIcon-root ': {
          fill: ({ palette }) => palette.primary.main,
        },

        '.MuiInputLabel-root': {
          color: '#3d537c',
        },

        '.MuiPaper-root': {
          borderRadius: '10px',
          borderColor: ({ palette }) => palette.primary.main,
          borderWidth: '2px',
        },
      }}
    >
      {options.map(({ value, label }: Option) => (
        <MenuItem
          key={value}
          value={value}
          sx={{
            color: 'rgba(70, 70, 70, 0.45)',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: 'normal',
          }}
        >
          {label}
        </MenuItem>
      ))}
    </MuiSelect>
  </FormControl>
);

export default SingleSelect;
