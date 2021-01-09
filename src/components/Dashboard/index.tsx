import React, { useContext, useState } from 'react';
import { createStyles, WithStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { EntryType } from 'react-bbox-annotator';
import NavBar from './NavBar';
import CurrentAnnotationObject from './CurrentAnnotation/CurrentAnnotationObject';
import UpcomingAnnotations from './UpcomingAnnotations';
import CurrentAnnotation from './CurrentAnnotation';
import Annotations from './CurrentAnnotation/Annotations';
import { AnnotationsContext } from '../../contexts/annotations.context';

const styles = createStyles({
    root: {
        width: '100%',
        height: '100%',
    },
    pane: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});
const Dashboard: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    const [entries, setEntries] = useState<EntryType[]>([]);
    const annotationsState = useContext(AnnotationsContext);
    const currentAnnotation = annotationsState.annotations.find(
        (annotation) => annotation._id === annotationsState.currentAnnotationId,
    );
    const upcomingAnnotations = annotationsState.annotations.filter(
        (annotation) => annotation._id !== annotationsState.currentAnnotationId,
    );
    return (
        <>
            <NavBar />
            <Grid container className={classes.root}>
                <Grid item xs={3} className={classes.pane}>
                    <UpcomingAnnotations upcomingAnnotations={upcomingAnnotations} />
                </Grid>
                <Grid item xs={6}>
                    <CurrentAnnotation
                        onChange={(e: EntryType[]) => setEntries(e)}
                        currentAnnotation={currentAnnotation}
                        entries={entries}
                    />
                </Grid>
                <Grid item xs={3} className={classes.pane}>
                    <CurrentAnnotationObject
                        instruction={currentAnnotation?.instruction}
                        objects={currentAnnotation?.params.objectsToAnnotate}
                    />
                    <Annotations entries={entries} />
                </Grid>
            </Grid>
        </>
    );
};

export default withStyles(styles)(Dashboard);
