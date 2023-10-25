import React, { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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
        (async () => {
            const profileRef = doc(db, "profile", String(user?.uid));

            const checkDb = async () => {
                try {
                    return ((await getDoc(profileRef)).data()) ? true : false
                } catch (error) {
                    return false
                }
            }
            const unsubscribed = auth.onAuthStateChanged(async (user: UserType) => {
                setUser(user);
                if (user) {
                    if (user.emailVerified) {
                        navigate(await checkDb() ? "/" : "setprofile");
                    } else {
                        navigate("/verify");
                    }
                } else {
                    navigate("/signin");
                }
            });
            return () => {
                unsubscribed();
            };
        })()
    },
        [user]);

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export { useAuthContext, AuthProvider }