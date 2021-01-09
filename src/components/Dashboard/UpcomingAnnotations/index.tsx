import React, { useContext, useState } from 'react';
import { WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DispatchContext } from '../../../contexts/annotations.context';
import { AnnotationType } from '../../../types';
import config from '../../../config';

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

interface Props {
    upcomingAnnotations: AnnotationType[];
}
const UpcomingAnnotations: React.FC<Props & WithStyles<typeof styles>> = ({ classes, upcomingAnnotations }) => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useContext(DispatchContext);

    const handleClick = (annotation: AnnotationType) => {
        const newCurrentAnnotationId = annotation._id;
        dispatch &&
            dispatch({
                type: 'SET_CURR_ANNOTATION_ID',
                payload: newCurrentAnnotationId,
            });
    };
    const fetchNextData = async () => {
        const res = await axios.get(`${config.API_URI}/api/v1/annotation/status/pending/${page}`);
        const annotations = res?.data || [];
        if (annotations.length === 0) {
            return setHasMore(false);
        }
        dispatch && dispatch({ type: 'ADD_ANNOTATIONS', payload: annotations });
        setPage((p) => p + 1);
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
};

export default withStyles(styles)(UpcomingAnnotations);
