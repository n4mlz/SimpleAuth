import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { SignOut } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const EmailVerification: React.FC = () => {

    const navigate = useNavigate();
    const user = useAuthContext();
    const [buttonClicked, setButtonClicked]  = useState<boolean>(false)

    const checkVerification = () => {
        if (user?.emailVerified) {
            navigate('/changeprofile');
        } else {
            setButtonClicked(true);
        }
    }

    useEffect(() => {
        if (user) { sendEmailVerification(user) };
    }, []);

    return (
        <div>
            <h1>メールアドレスの確認</h1>
            <p>あなたのメールアドレス({user?.email})宛てにメールを送信しました。メール内のリンクをクリックして、アドレスが正しいことを確認してください。</p>
            <button onClick={SignOut}>サインアウト</button>
            <button onClick={checkVerification}>次へ</button>
            {buttonClicked?<p>メールアドレスが確認されていません。メールが届かない場合は、登録したメールアドレスに間違いがないか確認してください。</p>:null}
        </div>
    );
}

export default EmailVerification;