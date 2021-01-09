import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Loading: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
};

export default withStyles(styles)(Loading);
