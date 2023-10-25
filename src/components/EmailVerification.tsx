import React, { useState, useEffect } from "react";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore"; 
import { db, SignOut } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const EmailVerification: React.FC = () => {

    const user = useAuthContext();
    const [isSentEmail, setIsSentEmail] = useState<boolean>(true);

    useEffect(() => {
        if (user) { (async () => {
            const mailsentRef = doc(db, "mailsent", String(user?.uid));

            const checkDb = async () => {
                try {
                    const time: Timestamp = (await getDoc(mailsentRef)).data()?.time;
                    if (time) {
                        return (Timestamp.now().seconds - time.seconds > 300);
                    } else {
                        return true;
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }

            if (await checkDb()) {
                setIsSentEmail(false);
                sendEmailVerification(user);
                setDoc(mailsentRef, {
                    userId: user?.uid,
                    time: Timestamp.now()
                });
            } else {
                setIsSentEmail(true);
            }
        })()}
    }, [user]);

    return (
        <div>
            <h1>メールアドレスの確認</h1>
            <p>{isSentEmail
                ?`5分以内にあなたのメールアドレス${user?.email}宛てに確認メールを送信済みです。メールを再送する場合は、しばらく待ってからこのページに再アクセスしてください。`
                :`あなたのメールアドレス${user?.email}宛てに確認メールを送信しました。メール内のリンクをクリックして、アドレスが正しいことを確認してください。`}</p>
            <button onClick={SignOut}>サインアウト</button>
            <a href="/changeprofile">次へ</a>
        </div>
    );
}

export default EmailVerification;