import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import styles from './styles';
import { logoutUser } from '../../../actions/auth.action';
import { connect, ConnectedProps } from 'react-redux';

const NavBar: React.FC<PropsFromRedux & WithStyles<typeof styles>> = ({ logoutUser, classes }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Image labelizer
                    </Typography>
                    <Button onClick={logoutUser} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
    return <></>;
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    };
};
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(withStyles(styles)(NavBar));
