import React, { createContext } from 'react';

type contextTypeLogin = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type contextTypeUser = {
    user: any,
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const LoginContext = createContext<contextTypeLogin>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});


export const UserContext = createContext<contextTypeUser>({
    user: false,
    setUser: () => {}
});