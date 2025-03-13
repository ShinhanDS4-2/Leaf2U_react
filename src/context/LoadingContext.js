import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);
    const [isDelaying, setIsDelaying] = useState(false);

    const startLoading = () => {
        setLoadingCount((prev) => prev + 1);
        setIsDelaying(true);
        setTimeout(() => setIsDelaying(false), 300);
    };

    const stopLoading = () => {
        setTimeout(
            () => {
                setLoadingCount((prev) => Math.max(0, prev - 1));
            },
            !isDelaying ? 300 : 0,
        );
    };

    return (
        <LoadingContext.Provider value={{ isLoading: loadingCount > 0, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
