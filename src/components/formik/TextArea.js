import React from 'react';
import { useField } from 'formik'
import { TextField, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: 10
    }
}))

const FormTextArea = ({ error, helperText, placeholder, ...props }) => {
    const classes = useStyles();
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <FormControl className={classes.root}>
            <TextField
                value={field.value}
                error={!!(errorText)}
                helperText={errorText}
                multiline
                rowsMax="4"
                fullWidth
                autoComplete="off"
                label={placeholder}
                {...props}
            />
        </FormControl>
    )
}

export default FormTextArea
