/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, TextField, makeStyles } from '@mui/material';
import { DatePicker, dateTimePickerTabsClasses } from '@mui/x-date-pickers';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import * as employeeService from '../../services/employeeService';

const initialFValues = {
  id: 0,
  departmentId: '',
  startDate: new Date(),
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm(props: {
  addOrEdit: any;
  recordForEdit: any;
}) {
  const { addOrEdit, recordForEdit } = props;

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.DatePicker
            name="startDate"
            label="даты начало"
            value={values.startDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.DatePicker
            name="hireDate"
            label="даты окончания"
            value={values.hireDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="departmentId"
            label="Причина отсутствия"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
          />
        </Grid>
        <Grid item xs={6}>
          <button className="button-save"> Сохранить</button>
          <button className="button-save" onClick={resetForm}>
            {' '}
            Сбросить
          </button>
        </Grid>
      </Grid>
    </Form>
  );
}
function validate(fieldValues?: any): boolean | undefined {
  throw new Error('Function not implemented.');
}
