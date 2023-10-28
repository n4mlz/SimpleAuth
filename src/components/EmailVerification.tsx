import React, { useState, useEffect } from "react";
import { SendVerifyEmail } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const EmailVerification: React.FC = () => {

    const user = useAuthContext();
    const [isSentEmail, setIsSentEmail] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        (async () => {
            // エラーが発生した場合はtrueが返る
            if (user) setIsSentEmail(await SendVerifyEmail(user));
        })()
    }, [user]);

    return (
        <div className="block">
            <h1 className="headline">メールアドレスの確認</h1>
            <p>{isSentEmail != undefined ? isSentEmail
                ? `5分以内にあなたのメールアドレス(${user?.email})宛てに確認メールを送信済みです。メールを再送する場合は、しばらく待ってからこのページに再アクセスしてください。`
                : `あなたのメールアドレス(${user?.email})宛てに確認メールを送信しました。メール内のリンクをクリックして、アドレスが正しいことを確認してください。`
                : null}</p>
            <a href="/verify">次へ</a>
        </div>
    );
}

export default EmailVerification;