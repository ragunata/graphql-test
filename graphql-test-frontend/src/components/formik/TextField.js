import React from 'react';
import { useField } from 'formik'
import { TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: 10
    }
}))

const FormTextField = ({ error, helperText, placeholder, ...props }) => {
    const classes = useStyles();
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <FormControl className={classes.root}>
            <TextField
                fullWidth
                value={field.value}
                error={!!(errorText)}
                helperText={errorText}
                autoComplete="off"
                label={placeholder}
                {...props}
            />
        </FormControl>
    )
}

export default FormTextField
