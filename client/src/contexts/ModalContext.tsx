import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    isLoginOpen: boolean;
    isRegisterOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    openRegister: () => void;
    closeRegister: () => void;
    switchToRegister: () => void;
    switchToLogin: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);
    const openRegister = () => setIsRegisterOpen(true);
    const closeRegister = () => setIsRegisterOpen(false);

    const switchToRegister = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
    };

    const switchToLogin = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    };

    return (
        <ModalContext.Provider
            value={{
                isLoginOpen,
                isRegisterOpen,
                openLogin,
                closeLogin,
                openRegister,
                closeRegister,
                switchToRegister,
                switchToLogin,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
