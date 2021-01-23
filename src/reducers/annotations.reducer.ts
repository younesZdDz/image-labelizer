import {
    AnnotationsAction,
    AnnotationsState,
    ANNOTATIONS_REQUEST,
    ANNOTATIONS_SUCCESS,
    ANNOTATIONS_FAILURE,
    SET_CURRENT_ANNOTATION_ID,
    UPDATE_ANNOTATION_REQUEST,
    UPDATE_ANNOTATION_SUCCESS,
    UPDATE_ANNOTATION_FAILURE,
} from '../types';

const defaultState: AnnotationsState = {
    isFetching: false,
    nextPage: 1,
    hasMore: true,
    currentAnnotationId: '',
    annotations: [],
};

const annotationsReducer: (state: AnnotationsState, action: AnnotationsAction) => AnnotationsState = (
    state = defaultState,
    action: AnnotationsAction,
) => {
    switch (action.type) {
        case ANNOTATIONS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ANNOTATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                nextPage: state.nextPage + 1,
                hasMore: action.payload.length > 0,
                annotations: [...state.annotations, ...action.payload],
                currentAnnotationId: state.annotations.length
                    ? state.annotations[0]._id
                    : action.payload.length
                    ? action.payload[0]._id
                    : '',
            };
        case ANNOTATIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        case SET_CURRENT_ANNOTATION_ID:
            return {
                ...state,
                currentAnnotationId: action.payload,
            };
        case UPDATE_ANNOTATION_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            const newAnnotations = state.annotations.filter((a) => a._id !== action.payload._id);
            // eslint-disable-next-line no-case-declarations
            const newCurrentAnnotationId = newAnnotations.length ? newAnnotations[0]._id : '';
            return {
                ...state,
                annotations: newAnnotations,
                currentAnnotationId: newCurrentAnnotationId,
            };
        default:
            return state;
    }
};
export default annotationsReducer;
