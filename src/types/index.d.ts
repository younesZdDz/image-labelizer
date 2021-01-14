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
export type AnnotationsState = { annotations: AnnotationType[]; currentAnnotationId: string };
export type AnnotationsAction =
    | { type: 'SET_ANNOTATIONS'; payload: AnnotationType[] }
    | { type: 'ADD_ANNOTATIONS'; payload: AnnotationType[] }
    | { type: 'SET_CURR_ANNOTATION_ID'; payload: string }
    | { type: 'SET'; payload: AnnotationsState };

export type AuthType = {
    accessToken: string;
    refreshToken: string;
    accessExpiresIn: number;
    refreshExpiresIn: number;
};
export type AuthState = AuthType;
string;
export type AuthAction =
    | { type: 'SET'; payload: AuthState }
    | { type: 'RESET' }
    | { type: 'SET_ACCESS'; payload: { accessToken: string; accessExpiresIn: number } };
export type Reducer<State, Action> = (prevState: State, action: Action) => State;
