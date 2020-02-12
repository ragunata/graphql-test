import React, { useRef, useState } from 'react';
import { Button, Grid, Container, Card, CardContent, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify'
import gql from 'graphql-tag';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormikTextField from '../components/formik/TextField';
import FormikTextArea from '../components/formik/TextArea';
import profileImage from '../assets/images/profile-placeholder.png'
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import client from '../apollo'

const SUBMIT_POST = gql`
  mutation SubmitPost($input: AgentInput!){
    addAgents(input: $input) {
        id
      }
  }
`;


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
        height: '100%'
    },
    profilePicWrapper: {
        marginTop: 7,
        marginBottom: 7
    },
    cursor: {
        cursor: 'pointer'
    },
    fullHeight: {
        height: '100vh'
    },
    textAlign: {
        textAlign: "center"
    },
    errorContainer: {
        color: 'red',
        margin: 0,
        fontSize: '0.75rem',
        marginTop: '3px',
        textAlign: 'left',
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
    }
}))


const Register = (props) => {
    const classes = useStyles();

    const [profilePic, setProfilePic] = useState({ image: profileImage });
    const [documents, setDocuments] = useState(null)

    const initialState = {
        name: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        profile: '',
        doc: ''
    }
    const validationSchema = yup.object({
        name: yup.string().required('Name is required').max(20, 'Name is too long'),
        email: yup.string().email('Invalid email').required('Email is Required'),
        phone: yup.string().trim().required('Phone Number is Required').matches(/^(([\(]{1}[0-9]{3}[\)]{1}[\ ]{1}[0-9]{3}[\-]{1}[0-9]{4}))$/, 'Invalid Number. Example Format (123) 456-7899'),
        address: yup.string().required('Address is Required').max(250, 'Address Max Length 250 is reached'),
        zip: yup.string().matches(/^(0|[1-9][0-9]*)$/, 'Invalid Number').required('Zip Code is Required').min(6, 'Min Length is 6').max(6, 'Max Length is 6'),
        profile: yup.mixed().required('Passport Size photo Required'),
        doc: yup.mixed().required('Proof Document Required')
    })

    const profileInput = useRef();
    const docInput = useRef();



    const showProfile = (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            let reader = new FileReader();

            reader.onloadend = () => {
                const r = reader
                r.image = r.result
                setProfilePic(r);
                console.log(profilePic)

            };
            reader.readAsDataURL(file);
        }
    }

    const changeDoc = (e) => {
        const file = e.target.files[0];
        if (file) {
            let reader = new FileReader();

            reader.onloadend = () => {
                const data = {
                    result: reader.result,
                }
                setDocuments({ ...data, fileName: file.name })

            };
            reader.readAsDataURL(file);
        }
    }


    return (
        <Container>
            <Grid container justify="center" className={classes.fullHeight} alignItems="center">
                <Grid item xs={12} sm={6} md={6} >
                    <Card >
                        <CardContent className="position-relative">
                            <Typography className="registerHeading" color="primary" variant="h6" align="center">Rentzend Agents Register</Typography>
                            <Formik
                                initialValues={{ ...initialState }}
                                onSubmit={async (data, { setSubmitting }) => {
                                    setSubmitting(true)
                                    const input = {
                                        name: data.name,
                                        email: data.email,
                                        contact_number: data.phone,
                                        address: data.address,
                                        zip_code: data.zip,
                                        avatar_image_dir: profilePic.image,
                                        license_image_dir: documents.result
                                    };
                                    console.log(input)
                                    const promis = await client.mutate({
                                        variables: { input },
                                        mutation: SUBMIT_POST
                                    })
                                    if (promis) {
                                        console.log(promis)
                                        toast.success("RentZend Agent Registered Successfully")
                                        props.history.push({
                                            pathname: '/',
                                        })
                                    }
                                }}
                                validationSchema={validationSchema}
                                validateOnBlur={true}
                            >{({ values, errors, isSubmitting, handleChange }) => {
                                return (
                                    <Form className="mt-3">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <div>
                                                    <Field name="name" placeholder="Name" type="text" as={FormikTextField} />
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={6}>

                                                <div>
                                                    <Field name="email" placeholder="Email" type="email" as={FormikTextField} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>

                                                <div>
                                                    <Field name="phone" placeholder="Phone Number" type="text" as={FormikTextField} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>

                                                <div>
                                                    <Field name="address" placeholder="Address" type="text" as={FormikTextArea} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <div>
                                                    <Field name="zip" placeholder="Zip Code" type="text" as={FormikTextField} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <div className="filewrapper">
                                            <Grid container className={classes.profilePicWrapper} >
                                                <Grid item sm={6} xs={12}>
                                                    <Grid container className={classes.grow} direction="column" justify="center" alignItems="center">
                                                        {profilePic && <div>
                                                            <img src={profilePic.image}
                                                                className={classes.cursor}
                                                                alt="profile pic"
                                                                height={150}
                                                                onClick={() => profileInput.current.click()}
                                                                width={150} />
                                                        </div>}
                                                        <Field
                                                            name="profile"
                                                            value={values.profile}
                                                            render={({ field, form }) => (
                                                                <React.Fragment>
                                                                    <input
                                                                        {...field}
                                                                        type="file"
                                                                        accept="image/png, image/jpeg"
                                                                        ref={profileInput}
                                                                        style={{ display: 'none' }}
                                                                        onChange={e => {
                                                                            showProfile(e)
                                                                            handleChange(e)
                                                                        }}
                                                                    />
                                                                    {errors.profile && form.touched.profile ? <div className={classes.errorContainer}>{errors.profile}</div> : ""}
                                                                </React.Fragment>
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item sm={6} xs={12} className={classes.profilePicWrapper} >
                                                    <Grid container direction="column" justify="center" alignItems="center">
                                                        <div>
                                                            <Button variant="contained" color="default" onClick={() => docInput.current.click()} startIcon={<CloudUploadIcon />}>Proof Document Upload</Button>
                                                            <Field
                                                                name="doc"
                                                                value={values.doc}
                                                                render={({ field, form }) => {
                                                                    return (
                                                                        <React.Fragment>
                                                                            < input
                                                                                {...field}
                                                                                type="file"
                                                                                ref={docInput}
                                                                                style={{ display: 'none' }}
                                                                                onChange={(e) => {
                                                                                    changeDoc(e)
                                                                                    handleChange(e)
                                                                                }}
                                                                            />
                                                                            {errors.doc && form.touched.doc ? <div className={classes.errorContainer}>{errors.doc}</div> : ""}
                                                                        </React.Fragment>
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Typography component="p" align="center">
                                                                {documents && documents.fileName}
                                                            </Typography>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className={classes.textAlign}>
                                            <Button color="secondary" size="large" variant="outlined" disabled={isSubmitting} type="submit">Submit</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Register
