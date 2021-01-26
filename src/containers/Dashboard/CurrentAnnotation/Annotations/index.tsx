import React from 'react';
import { WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { EntryType } from 'react-bbox-annotator';

const Annotations: React.FC<Props & WithStyles<typeof styles>> = ({ classes, entries }) => {
    return entries.length ? (
        <Card className={classes.root}>
            <div>
                <Typography gutterBottom variant="h5" component="h2">
                    Annotations
                </Typography>
            </div>
            {entries.map((entry, i) => (
                <div
                    className={classes.entry}
                    style={{
                        marginTop: i ? '1rem' : 0,
                    }}
                    key={i}
                >
                    <div>
                        <span className={classes.boldText}>Label: </span>
                        <span>{entry.label}</span>
                    </div>
                    <div>
                        <span className={classes.boldText}>Corners: </span>
                        <span>
                            {entry.left} x {entry.top}
                        </span>
                    </div>
                    <div>
                        <span className={classes.boldText}>Size: </span>
                        <span>
                            {entry.width} x {entry.height}
                        </span>
                    </div>
                </div>
            ))}
        </Card>
    ) : null;
};
interface Props {
    entries: EntryType[];
}
const styles = createStyles({
    root: {
        width: '90%',
        padding: '1rem',
        marginTop: '2rem',
        maxHeight: '60vh',
        overflow: 'auto',
    },
    boldText: {
        fontWeight: 'bold',
    },
    entry: {
        padding: '1rem',
        border: '1px solid #d6d0d0',
    },
});
export default withStyles(styles)(Annotations);
