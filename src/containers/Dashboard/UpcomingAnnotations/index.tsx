import React from 'react';
import { WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {
    AnnotationType,
    asyncFetchAnnotations,
    setCurrentAnnotationId,
    selectHasMore,
} from '../../../reduxSlices/annotations';

const UpcomingAnnotations: React.FC<Props & WithStyles<typeof styles>> = ({ upcomingAnnotations, classes }) => {
    const dispatch = useDispatch();
    const hasMore = useSelector(selectHasMore);
    const handleClick = (annotationId: string) => {
        dispatch(setCurrentAnnotationId(annotationId));
    };
    const fetchNextData = async () => {
        dispatch(asyncFetchAnnotations());
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
                                onClick={() => handleClick(annotation._id)}
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

type Props = {
    upcomingAnnotations: AnnotationType[];
};

export default withStyles(styles)(UpcomingAnnotations);
