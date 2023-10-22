import React, { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { auth } from "../firebase";

type UserType = User | null;

const AuthContext = createContext<UserType>(null);

function useAuthContext() {
    return useContext(AuthContext);
}

const AuthProvider: React.FC<{ children: ReactNode }> = (props) => {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>(null);
    const value = user;

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user: UserType) => {
            setUser(user);
            if (user) {
                navigate(user.emailVerified ? "/" : "/verify");
            } else {
                navigate("/signin");
            }
        });
        return () => {
            unsubscribed();
        };
    }, []);

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export { useAuthContext, AuthProvider }