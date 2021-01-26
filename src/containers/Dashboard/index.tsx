import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { EntryType } from 'react-bbox-annotator';
import { withStyles } from '@material-ui/styles';
import { createStyles, WithStyles } from '@material-ui/core/styles';
import { selectCurrentAnnotationId, selectAnnotations, asyncFetchAnnotations } from '../../reduxSlices/annotations';
import NavBar from './NavBar';
import CurrentAnnotationObject from './CurrentAnnotation/CurrentAnnotationObject';
import UpcomingAnnotations from './UpcomingAnnotations';
import CurrentAnnotation from './CurrentAnnotation';
import Annotations from './CurrentAnnotation/Annotations';

const Dashboard: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
    const annotations = useSelector(selectAnnotations);
    const currentAnnotationId = useSelector(selectCurrentAnnotationId);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncFetchAnnotations());
    }, []);
    const [entries, setEntries] = useState<EntryType[]>([]);
    const currentAnnotation = annotations.find((annotation) => annotation._id === currentAnnotationId);
    const upcomingAnnotations = annotations.filter((annotation) => annotation._id !== currentAnnotationId);

    return (
        <>
            <NavBar />
            <Grid container className={classes.root}>
                <Grid item xs={3} className={classes.pane}>
                    <UpcomingAnnotations upcomingAnnotations={upcomingAnnotations} />
                </Grid>
                <Grid item xs={6}>
                    <CurrentAnnotation
                        currentAnnotation={currentAnnotation}
                        onChange={(e: EntryType[]) => setEntries(e)}
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
export default withStyles(styles)(Dashboard);
