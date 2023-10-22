import React, { useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { SignOut } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';

const EmailVerification: React.FC = () => {
    const user = useAuthContext();
    useEffect(() => {
        if (user) { sendEmailVerification(user) };
    }, []);
    return (
        <div>
            <h1>メールアドレスの確認</h1>
            <p>あなたのメールアドレス({user?.email})宛てにメールを送信しました。メール内のリンクをクリックして、アドレスが正しいことを確認してください。</p>
            <button onClick={SignOut}>サインアウト</button>
        </div>
    );
}

export default EmailVerification;