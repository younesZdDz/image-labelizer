import React, { useState, useRef } from 'react';
import BBoxAnnotator, { EntryType } from 'react-bbox-annotator';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AnnotationType, asyncUpdateAnnotation } from '../../../reduxSlices/annotations';

const CurrentAnnotation: React.FC<Props> = ({ currentAnnotation, onChange, entries }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };
    const handleSubmit = () => {
        dispatch(
            asyncUpdateAnnotation({
                annotationId: currentAnnotation?._id || '',
                data: {
                    annotations: entries,
                    comment,
                },
            }),
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        bboxAnnotatorRef.current?.reset();
    };
    const handleClickReset = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        bboxAnnotatorRef.current?.reset();
    };

    const bboxAnnotatorRef = useRef();
    const content = currentAnnotation ? (
        <div style={{ marginTop: '2rem' }}>
            <BBoxAnnotator
                ref={bboxAnnotatorRef}
                url={currentAnnotation.params.attachment}
                inputMethod="select"
                labels={currentAnnotation.params.objectsToAnnotate}
                onChange={onChange}
            />
            <Card>
                <CardActions>
                    <Grid item xs={2}>
                        <Button onClick={handleClickReset} variant="contained" color="secondary">
                            Reset
                        </Button>
                    </Grid>
                    <Grid direction="row-reverse" container>
                        <Box mr={0}>
                            <Grid item xs={2}>
                                <Button onClick={handleSubmit} variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                </CardActions>
                <CardActions>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        value={comment}
                        id="comment"
                        style={{ width: '100%' }}
                        rows={4}
                        onChange={handleChangeComment}
                    />
                </CardActions>
            </Card>
        </div>
    ) : null;
    return <>{content}</>;
};

type Props = {
    currentAnnotation: AnnotationType | undefined;
    onChange: (e: EntryType[]) => void;
    entries: EntryType[];
};
export default CurrentAnnotation;
