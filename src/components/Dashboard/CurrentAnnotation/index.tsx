import React, { useState, useContext, useRef } from 'react';
import BBoxAnnotator, { EntryType } from 'react-bbox-annotator';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { DispatchContext, AnnotationsContext } from '../../../contexts/annotations.context';
import { AnnotationType } from '../../../types';
import { Box } from '@material-ui/core';
import { DateTime } from 'luxon';
import config from '../../../config';
import { AuthContext, SetAuthContext } from '../../../contexts/auth.context';

type Props = {
    currentAnnotation: AnnotationType | undefined;
    onChange: (e: EntryType[]) => void;
    entries: EntryType[];
};

const CurrentAnnotation: React.FC<Props> = ({ currentAnnotation, onChange, entries }) => {
    const authState = useContext(AuthContext);
    const dispatchAuth = useContext(SetAuthContext);

    const dispatch = useContext(DispatchContext);
    const annotationsState = useContext(AnnotationsContext);
    const [comment, setComment] = useState('');
    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };
    const handleSubmit = async () => {
        if (authState?.refreshToken && authState?.refreshExpiresIn - DateTime.local().toSeconds() < 0) {
            await axios.put(
                `${config.API_URI}/api/v1/auth/logout`,
                {
                    refreshToken: authState.refreshToken,
                },
                {
                    headers: {
                        authorization: authState.accessToken,
                    },
                },
            );

            dispatchAuth &&
                dispatchAuth({
                    type: 'RESET',
                });
        } else if (authState?.accessToken && authState?.accessExpiresIn - DateTime.local().toSeconds() < 0) {
            const res = await axios.put(
                `${config.API_URI}/api/v1/auth/refresh-token`,
                {
                    refreshToken: authState.refreshToken,
                },
                {
                    headers: {
                        authorization: authState.accessToken,
                    },
                },
            );

            dispatchAuth &&
                dispatchAuth({
                    type: 'SET_ACCESS',
                    payload: {
                        accessToken: res.headers['authorization'],
                        accessExpiresIn: res.headers['x-access-expiry-time'],
                    },
                });
        }
        await axios.put(
            `${config.API_URI}/api/v1/annotation/${currentAnnotation?._id}`,
            {
                annotations: entries,
                comment,
            },
            {
                headers: {
                    authorization: authState?.accessToken,
                },
            },
        );

        const newAnnotations = annotationsState.annotations.filter((a) => a._id !== currentAnnotation?._id);
        const newAnnotationId = newAnnotations.length ? newAnnotations[0]._id : '';
        dispatch &&
            dispatch({ type: 'SET', payload: { annotations: newAnnotations, currentAnnotationId: newAnnotationId } });
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

export default CurrentAnnotation;
