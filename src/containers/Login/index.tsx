import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import { FormHelperText } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { Formik } from 'formik';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';
import { loginUser } from '../../actions/auth.action';
import { SystemState } from '../../types';

const Login: React.FC<PropsFromRedux> = ({ isAuthenticated, loginUser, errorMessage }) => {
    const classes = useStyles();

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values: { email: string; password: string }) => {
                            loginUser({
                                email: values.email,
                                password: values.password,
                            });
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && errors.email !== undefined}
                                    helperText={errors.email}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && errors.password !== undefined}
                                    helperText={errors.password}
                                />
                                <FormHelperText error={true}>{errorMessage}</FormHelperText>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

            <Snackbar open={true}>
                <SnackbarContent
                    message={'If you want a test email, shoot me an email at younes.zadi.1997@gmail.com'}
                />
            </Snackbar>
        </>
    );
};

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').lowercase().trim().required('Required'),
    password: Yup.string().min(8).max(16).required('Required').trim(),
});
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function mapStateToProps(state: SystemState) {
    const {
        auth: { isAuthenticated, errorMessage },
    } = state;

    return {
        isAuthenticated,
        errorMessage,
    };
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (creds: { email: string; password: string }) => dispatch(loginUser(creds)),
    };
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
