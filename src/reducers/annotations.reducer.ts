import { AnnotationsState, AnnotationsAction, Reducer } from '../types';

const reducer: Reducer<AnnotationsState, AnnotationsAction> = (
    state: AnnotationsState,
    action: AnnotationsAction,
): AnnotationsState => {
    switch (action.type) {
        case 'SET':
            return {
                currentAnnotationId: action.payload.currentAnnotationId,
                annotations: [...action.payload.annotations],
            };
        case 'SET_ANNOTATIONS':
            return {
                ...state,
                annotations: [...action.payload],
            };
        case 'ADD_ANNOTATIONS':
            return {
                ...state,
                annotations: [...state.annotations, ...action.payload],
            };
        case 'SET_CURR_ANNOTATION_ID':
            return {
                ...state,
                currentAnnotationId: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
