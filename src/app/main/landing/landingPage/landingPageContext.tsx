// Create a context
import React, { createContext, useContext, useState } from 'react';

type LoaderContextType ={}

const RecommendationContext = createContext<LoaderContextType | undefined>(undefined);

export const useRecommendation = () => useContext(RecommendationContext);

export const RecommendationProvider = ({ children }) => {
    const [data, setData] = useState(null);

    return (
        <RecommendationContext.Provider value={{ data, setData }}>
            {children}
        </RecommendationContext.Provider>
    );
}