import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        flexDirection: 'column',
        height: '100vh'
    },
    textCenter: {
        textAlign: "center",
        color: '#fff',
        marginTop: 4
    }
}));

const Welcome = ({ history }) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} justify="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
                <h1 className={classes.textCenter}>
                    Welcome to Rentzend
                </h1>
                <div className={classes.textCenter}>
                    <Button variant="contained" color="secondary" onClick={() => history.push('/register')} >
                        Click to Register
                </Button>
                </div>
                <div className={classes.textCenter}>
                    <Button onClick={() => history.push('/agentslist')} >
                        View Registered Agents
                </Button>

                </div>
            </Grid>
        </Grid >
    )
}

export default Welcome
