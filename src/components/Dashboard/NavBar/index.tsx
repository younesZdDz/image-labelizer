import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

const NavBar: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Image labelizer
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(NavBar);
