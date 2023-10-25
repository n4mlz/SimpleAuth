import React, { useState, useEffect } from "react";
import { SendVerifyEmail, SignOut } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const EmailVerification: React.FC = () => {

    const user = useAuthContext();
    const [isSentEmail, setIsSentEmail] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (user) {
                // エラーが発生した場合はtrueが返る
                setIsSentEmail(await SendVerifyEmail(user));
            }
        })()
    }, [user]);

    return (
        <div>
            <h1>メールアドレスの確認</h1>
            <p>{isSentEmail
                ? `5分以内にあなたのメールアドレス${user?.email}宛てに確認メールを送信済みです。メールを再送する場合は、しばらく待ってからこのページに再アクセスしてください。`
                : `あなたのメールアドレス${user?.email}宛てに確認メールを送信しました。メール内のリンクをクリックして、アドレスが正しいことを確認してください。`}</p>
            <button onClick={SignOut}>サインアウト</button>
            <a href="/changeprofile">次へ</a>
        </div>
    );
}

export default EmailVerification;