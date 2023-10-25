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
    const value: UserType = user;

    useEffect(() => {
        (async () => {

            // プロフィール情報の入力が済んでいるかを確認する
            const profileRef = doc(db, "profile", String(user?.uid));
            const checkDb = async () => {
                try {
                    return ((await getDoc(profileRef)).data()) ? true : false
                } catch (error) {
                    return false
                }
            }

            // userのログイン状態が更新されたら適切なページに遷移させる
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
    }, [user]);

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export { useAuthContext, AuthProvider }