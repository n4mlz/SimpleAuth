import { ReactNode, createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from "firebase/auth";
import { auth } from '../firebase';

type UserType = User | null;

const AuthContext = createContext<UserType>(null);

function useAuthContext() {
    return useContext(AuthContext);
}

function AuthProvider({ children }: { children: ReactNode; }) {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>(null);
    const value = user;

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user: UserType) => {
            setUser(user);
            navigate(user ? '/' : '/signin');
        });
        return () => {
            unsubscribed();
        };
    }, []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuthContext, AuthProvider }