import React, { ReactNode, createContext, useState, useContext, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

type UserType = User | null | undefined;

const AuthContext = createContext<UserType>(undefined);

function useAuthContext() {
    return useContext(AuthContext);
}

const isProfileSet = async (user: UserType) => {
    const profileRef = doc(db, "profile", String(user?.uid));
    try {
        return ((await getDoc(profileRef)).data()) ? true : false
    } catch (error) {
        return false
    }
}

const AuthProvider: React.FC<{ children: ReactNode }> = (props) => {

    const [user, setUser] = useState<UserType>(undefined);
    const value: UserType = user;

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user: UserType) => {
            setUser(user);
        });
        return () => {
            unsubscribed();
        };
    }, []);

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export { useAuthContext, isProfileSet, AuthProvider };