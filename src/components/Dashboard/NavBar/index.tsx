import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import config from '../../../config';
import styles from './styles';
import { AuthContext, SetAuthContext } from '../../../contexts/auth.context';

const NavBar: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    const authState = useContext(AuthContext);
    const dispatchAuth = useContext(SetAuthContext);

    const onLogout = async () => {
        await axios.put(
            `${config.API_URI}/api/v1/auth/logout`,
            {
                refreshToken: authState?.refreshToken,
            },
            {
                headers: {
                    authorization: authState?.accessToken,
                },
            },
        );

        dispatchAuth &&
            dispatchAuth({
                type: 'RESET',
            });
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Image labelizer
                    </Typography>
                    <Button onClick={onLogout} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(NavBar);
