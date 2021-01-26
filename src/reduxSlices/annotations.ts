import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { callApi } from '../api';
import { RootState } from '../configStore';
import { FetchStatus } from '../types';

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
    status: FetchStatus;
    nextPage: number;
    hasMore: boolean;
    annotations: AnnotationType[];
    currentAnnotationId: string;
};

const initialState: AnnotationsState = {
    status: 'idle',
    nextPage: 1,
    hasMore: true,
    annotations: [],
    currentAnnotationId: '',
};

export const annotationsSlice = createSlice({
    name: 'annotations',
    initialState,
    reducers: {
        setCurrentAnnotationId: (state, action: PayloadAction<string>) => {
            state.currentAnnotationId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase('annotations/fetchAnnotations/pending', (state) => {
            state.status = 'loading';
        });
        builder.addCase('annotations/fetchAnnotations/fulfilled', (state, action) => {
            state.status = 'succeeded';
            state.nextPage += 1;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            state.hasMore = action.payload.length > 0;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            state.annotations = state.annotations.concat(action.payload);
            state.currentAnnotationId = state.annotations.length
                ? state.annotations[0]._id
                : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                action.payload.length
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  action.payload[0]._id
                : '';
        });
        builder.addCase('annotations/fetchAnnotations/rejected', (state, action) => {
            state.status = 'failed';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            state.errorMessage = action.error.message;
        });
        builder.addCase('annotations/updateAnnotation/fulfilled', (state, action) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const newAnnotations = state.annotations.filter((a) => a._id !== action.payload._id);
            const newCurrentAnnotationId = newAnnotations.length ? newAnnotations[0]._id : '';

            state.annotations = newAnnotations;
            state.currentAnnotationId = newCurrentAnnotationId;
        });
    },
});

export const asyncFetchAnnotations = createAsyncThunk(
    'annotations/fetchAnnotations',
    async (data, { getState }: { getState: any }) => {
        try {
            const {
                annotations: { nextPage },
            } = getState();
            const response = await callApi(`api/v1/annotation/status/pending/${nextPage}`, true, 'get');
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || 'There was an error';
            throw new Error(errorMessage);
        }
    },
);
export const asyncUpdateAnnotation = createAsyncThunk(
    'annotations/updateAnnotation',
    async ({ annotationId, data }: { annotationId: string; data: any }) => {
        try {
            const response = await callApi(`api/v1/annotation/${annotationId}`, true, 'put', data);
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || 'There was an error';
            throw new Error(errorMessage);
        }
    },
);
export const { setCurrentAnnotationId } = annotationsSlice.actions;

export const selectAnnotations = (state: RootState) => state.annotations.annotations;
export const selectCurrentAnnotationId = (state: RootState) => state.annotations.currentAnnotationId;
export const selectStatus = (state: RootState) => state.annotations.status;
export const selectHasMore = (state: RootState) => state.annotations.hasMore;

export default annotationsSlice.reducer;
