import { CALL_API } from '../api';
import {
    ANNOTATIONS_REQUEST,
    ANNOTATIONS_SUCCESS,
    ANNOTATIONS_FAILURE,
    SET_CURRENT_ANNOTATION_ID,
    SetCurrentAnnotationIdAction,
    AnnotationType,
    UPDATE_ANNOTATION_REQUEST,
    UPDATE_ANNOTATION_SUCCESS,
    UPDATE_ANNOTATION_FAILURE,
    UpdateAnnotationSuccessAction,
    LOGIN_FAILURE,
} from '../types';

export const fetchAnnotations = (nextPage = 1) => {
    return {
        [CALL_API]: {
            endpoint: `api/v1/annotation/status/pending/${nextPage}`,
            authenticated: true,
            types: [ANNOTATIONS_REQUEST, ANNOTATIONS_SUCCESS, ANNOTATIONS_FAILURE],
        },
    };
};

export const setCurrentAnnotationId: (currentAnnotationId: string) => SetCurrentAnnotationIdAction = (
    currentAnnotationId: string,
) => {
    return {
        type: SET_CURRENT_ANNOTATION_ID,
        payload: currentAnnotationId,
    };
};

export const updateAnnotation = (annotationId: string, data: any) => {
    return (dispatch: any) => {
        dispatch({
            [CALL_API]: {
                endpoint: `api/v1/annotation/${annotationId}`,
                authenticated: true,
                types: [UPDATE_ANNOTATION_REQUEST, UPDATE_ANNOTATION_SUCCESS, UPDATE_ANNOTATION_FAILURE, LOGIN_FAILURE],
                method: 'put',
                data,
            },
        });
    };
};
