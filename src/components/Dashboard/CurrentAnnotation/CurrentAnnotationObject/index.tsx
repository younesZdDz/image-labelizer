import React from 'react';
import { WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';

const styles = createStyles({
    root: {
        width: '90%',
        padding: '1rem',
        marginTop: '2rem',
    },
});

interface Props extends WithStyles<typeof styles> {
    objects: string[] | undefined;
    instruction: string | undefined;
}
const CurrentAnnotationObject: React.FC<Props> = ({ classes, objects, instruction }) => {
    return (
        <Card className={classes.root}>
            <div>
                <Typography gutterBottom variant="h5" component="h2">
                    {instruction}
                </Typography>
            </div>
            <CardActions>
                {objects?.map((object) => {
                    return <Chip key={object} label={object} clickable color="primary" variant="outlined" />;
                })}
            </CardActions>
        </Card>
    );
};

export default withStyles(styles)(CurrentAnnotationObject);
