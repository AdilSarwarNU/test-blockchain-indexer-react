import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useCookies} from "react-cookie";
import Container from '@material-ui/core/Container';
import Routes from "../Utils/Routes";
import {withRouter} from "react-router-dom";
import UserConstants from "../constants/Auth/User";
import {AppContext} from "../Contexts/AppContext";
import Auth from "../Api/Auth";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginForm = props => {
    const classes = useStyles();
    const context = useContext(AppContext);
    const [cookies, setCookies] = useCookies([UserConstants.USER_COOKIE]);

    const [isLoading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = event => {
        event.preventDefault();
        setLoading(true);
        Auth.signIn(email, password).then(response => {
            // setCookies(UserConstants.JWT_TOKEN, response.data.result.token);
            props.history.push('/user');
        }, err => {
            console.log("err:", err.message);
            context.showMessage(err.message, {error: true});
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email} onChange={event => setEmail(event.target.value)}
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
                        value={password} onChange={event => setPassword(event.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    {/*<Col xs="12">*/}
                    {/*    <ProgressButton*/}
                    {/*        isLoading={isLoading}*/}
                    {/*        type="submit"*/}
                    {/*        size="lg"*/}
                    {/*        color="secondary">*/}
                    {/*        Login*/}
                    {/*    </ProgressButton>*/}
                    {/*</Col>*/}
                    <Link to={Routes.TransactionTable}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" color="secondary">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" color="secondary">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(LoginForm);

