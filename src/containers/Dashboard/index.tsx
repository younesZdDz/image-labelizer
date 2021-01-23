import React, { useEffect, useState } from 'react';
import { createStyles, WithStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { fetchAnnotations } from '../../actions/annotations.action';
import Grid from '@material-ui/core/Grid';
import { EntryType } from 'react-bbox-annotator';
import { connect, ConnectedProps } from 'react-redux';
import NavBar from './NavBar';
import CurrentAnnotationObject from './CurrentAnnotation/CurrentAnnotationObject';
import UpcomingAnnotations from './UpcomingAnnotations';
import CurrentAnnotation from './CurrentAnnotation';
import Annotations from './CurrentAnnotation/Annotations';
import { SystemState } from '../../types';

const Dashboard: React.FC<PropsFromRedux & WithStyles<typeof styles>> = ({
    classes,
    annotations,
    currentAnnotationId,
    fetchAnnotations,
}) => {
    useEffect(() => {
        fetchAnnotations();
    }, []);
    const [entries, setEntries] = useState<EntryType[]>([]);
    const currentAnnotation = annotations.find((annotation) => annotation._id === currentAnnotationId);
    return (
        <>
            <NavBar />
            <Grid container className={classes.root}>
                <Grid item xs={3} className={classes.pane}>
                    <UpcomingAnnotations />
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
function mapStateToProps(state: SystemState) {
    const {
        annotations: { annotations, currentAnnotationId },
    } = state;

    return {
        annotations,
        currentAnnotationId,
    };
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAnnotations: () => dispatch(fetchAnnotations()),
    };
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
