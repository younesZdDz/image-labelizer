/**
 * Auth types
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export type AuthState = {
    isFetching: boolean;
    isAuthenticated: boolean;
    errorMessage?: string;
};
export type LoginRequestAction = {
    type: typeof LOGIN_REQUEST;
};
export type LoginSuccessAction = {
    type: typeof LOGIN_SUCCESS;
};
export type LoginFailureAction = {
    type: typeof LOGIN_FAILURE;
    payload: string;
};
export type LogoutRequestAction = {
    type: typeof LOGOUT_REQUEST;
};
export type LogoutSuccessAction = {
    type: typeof LOGOUT_SUCCESS;
};
export type LogoutFailureAction = {
    type: typeof LOGOUT_FAILURE;
};
export type AuthAction =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutRequestAction
    | LogoutSuccessAction
    | LogoutFailureAction;
export type AuthDispatchType = (args: AuthAction) => AuthAction;

/**
 * Annotations types
 */
export const ANNOTATIONS_REQUEST = 'ANNOTATIONS_REQUEST';
export const ANNOTATIONS_SUCCESS = 'ANNOTATIONS_SUCCESS';
export const ANNOTATIONS_FAILURE = 'ANNOTATIONS_FAILURE';

export const UPDATE_ANNOTATION_REQUEST = 'UPDATE_ANNOTATION_REQUEST';
export const UPDATE_ANNOTATION_SUCCESS = 'UPDATE_ANNOTATION_SUCCESS';
export const UPDATE_ANNOTATION_FAILURE = 'UPDATE_ANNOTATION_FAILURE';

export const SET_CURRENT_ANNOTATION_ID = 'SET_CURRENT_ANNOTATION_ID';
export type AnnotationType = {
    _id: string;
    status: 'pending' | 'completed';
    instruction: string;
    params: {
        attachmentType: 'image';
        attachment: string;
        objectsToAnnotate: string[];
    };
};
export type AnnotationsState = {
    isFetching: boolean;
    nextPage: number;
    hasMore: boolean;
    annotations: AnnotationType[];
    currentAnnotationId: string;
};
export type AnnotationsRequestAction = {
    type: typeof ANNOTATIONS_REQUEST;
};
export type AnnotationsSuccessAction = {
    type: typeof ANNOTATIONS_SUCCESS;
    payload: AnnotationType[];
};
export type AnnotationsFailureAction = {
    type: typeof ANNOTATIONS_FAILURE;
    payload: string;
};

export type UpdateAnnotationRequestAction = {
    type: typeof UPDATE_ANNOTATION_REQUEST;
};
export type UpdateAnnotationSuccessAction = {
    type: typeof UPDATE_ANNOTATION_SUCCESS;
    payload: AnnotationType;
};
export type UpdateAnnotationFailureAction = {
    type: typeof UPDATE_ANNOTATION_FAILURE;
};
export type SetCurrentAnnotationIdAction = {
    type: typeof SET_CURRENT_ANNOTATION_ID;
    payload: string;
};
export type AnnotationsAction =
    | AnnotationsRequestAction
    | AnnotationsSuccessAction
    | AnnotationsFailureAction
    | UpdateAnnotationRequestAction
    | UpdateAnnotationSuccessAction
    | UpdateAnnotationFailureAction
    | SetCurrentAnnotationIdAction;
export type AnnotationsDispatchType = (args: AnnotationsAction) => AnnotationsAction;

/**
 * System Types
 */

export type SystemState = { auth: AuthState; annotations: AnnotationsState };
export type SystemAction = AuthAction | AnnotationsAction;
