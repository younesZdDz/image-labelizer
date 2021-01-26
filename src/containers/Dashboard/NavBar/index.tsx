import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { logout } from '../../../reduxSlices/auth';
import { useDispatch } from 'react-redux';

import styles from './styles';

const NavBar: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    const dispatch = useDispatch();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Image labelizer
                    </Typography>
                    <Button onClick={() => dispatch(logout())} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
    return <></>;
};

export default withStyles(styles)(NavBar);
