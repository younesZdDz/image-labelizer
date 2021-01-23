import React from 'react';
import { WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect, ConnectedProps } from 'react-redux';
import { AnnotationType, SystemState } from '../../../types';
import { fetchAnnotations, setCurrentAnnotationId } from '../../../actions/annotations.action';

const UpcomingAnnotations: React.FC<PropsFromRedux & WithStyles<typeof styles>> = ({
    annotations,
    currentAnnotationId,
    hasMore,
    nextPage,
    setCurrentAnnotationId,
    fetchAnnotations,
    classes,
}) => {
    const upcomingAnnotations = annotations.filter((annotation) => annotation._id !== currentAnnotationId);

    const handleClick = (annotation: AnnotationType) => {
        const newCurrentAnnotationId = annotation._id;
        setCurrentAnnotationId(newCurrentAnnotationId);
    };
    const fetchNextData = async () => {
        fetchAnnotations(nextPage);
    };
    return (
        <Card id="scrollElement" className={classes.root}>
            <Typography gutterBottom variant="h5" component="h2">
                Upcoming annotations
            </Typography>
            <CardActions className={classes.upcomingAnnotations}>
                <InfiniteScroll
                    scrollableTarget="scrollElement"
                    dataLength={upcomingAnnotations.length}
                    next={fetchNextData}
                    hasMore={hasMore}
                    loader={<CircularProgress />}
                >
                    {upcomingAnnotations.map((annotation) => {
                        return (
                            <div
                                onClick={() => handleClick(annotation)}
                                className={classes.upcomingAnnotation}
                                key={annotation._id}
                                id={annotation._id}
                            >
                                <img src={annotation.params.attachment} className={classes.img} alt="Annotation" />
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </CardActions>
        </Card>
    );
    return <></>;
};
const styles = createStyles({
    root: {
        width: '90%',
        padding: '1rem',
        marginTop: '2rem',
        maxHeight: '70vh',
        overflowY: 'scroll',
    },
    upcomingAnnotations: {
        display: 'flex',
        flexDirection: 'column',
    },
    upcomingAnnotation: {
        cursor: 'grab',
        margin: '0 !important',
    },
    img: {
        width: '100%',
    },
});
function mapStateToProps(state: SystemState) {
    const {
        annotations: { annotations, currentAnnotationId, hasMore, nextPage },
    } = state;

    return {
        annotations,
        currentAnnotationId,
        hasMore,
        nextPage,
    };
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        setCurrentAnnotationId: (currentAnnotationId: string) => dispatch(setCurrentAnnotationId(currentAnnotationId)),
        fetchAnnotations: (nextPage: number) => dispatch(fetchAnnotations(nextPage)),
    };
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withStyles(styles)(UpcomingAnnotations));
