import { useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { SignOut } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';

function EmailVerification() {
    const user = useAuthContext();
    useEffect(() => {
        if (user) {sendEmailVerification(user)};
    }, []);
    return (
        <div>
            <button onClick={SignOut}>サインアウト</button>
        </div>
    );
}

export default EmailVerification;