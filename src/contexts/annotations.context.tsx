import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import annotationsReducer from '../reducers/annotations.reducer';
import { AnnotationsState, AnnotationsAction } from '../types';
import config from '../config';

const defaultAnnotationsData = {
    annotations: [],
    currentAnnotationId: '',
};

export const AnnotationsContext = createContext<AnnotationsState>(defaultAnnotationsData);
export const DispatchContext = createContext<React.Dispatch<AnnotationsAction> | null>(null);

export const AnnotationsProvider: React.FC = ({ children }) => {
    const [annotations, dispatch] = useReducer(annotationsReducer, defaultAnnotationsData);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${config.API_URI}/api/v1/annotation/status/pending`);
            const annotations = res?.data || [];
            dispatch({ type: 'SET_ANNOTATIONS', payload: annotations });
            dispatch({ type: 'SET_CURR_ANNOTATION_ID', payload: annotations.length ? annotations[0]._id : '' });
        };
        fetchData();
    }, []);
    return (
        <DispatchContext.Provider value={dispatch}>
            <AnnotationsContext.Provider value={annotations}>{children}</AnnotationsContext.Provider>
        </DispatchContext.Provider>
    );
};
