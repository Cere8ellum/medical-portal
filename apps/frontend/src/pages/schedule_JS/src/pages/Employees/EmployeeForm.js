import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";


const initialFValues = {
    id: 0,
    departmentId: '',
    startDate: new Date(),
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "Необходимо заполнить."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }



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
                        error={errors.departmentId}
                        />
                </Grid>
                <Grid item xs={6}>
                        <button className="button-save"> Сохранить</button>
                        <button className="button-save" onClick={resetForm}> Сбросить</button>

                </Grid>
            </Grid>
        </Form>
    )
}
