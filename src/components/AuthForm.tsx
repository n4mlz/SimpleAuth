import { FormEvent, useState } from 'react';
import { SignIn, SignUp } from '../firebase';

var emailErrorMessages: {[key:string]:string} = {
    'auth/invalid-email': 'メールアドレスの形式が間違っています。',
    'auth/user-disabled': 'ユーザーは無効になっています。',
    'auth/user-not-found': 'ユーザーが存在しません。',
    'auth/invalid-login-credentials': 'メールアドレスまたはパスワードが間違っています。',
    'auth/emailAlreadyInUse': 'このメールアドレスは既に使用されています。'
}

var passwordErrorMessages: {[key:string]:string} = {
    'auth/wrong-password': 'パスワードが間違っています。',
    'auth/too-many-requests': '何度もパスワードを間違えたため、一時的に機能が制限されています。',
    'auth/invalid-login-credentials': 'メールアドレスまたはパスワードが間違っています。',
    'auth/weak-password': 'パスワードは6文字以上で入力してください。'
}

function AuthForm() {
    // true: sign-in, false: sign-up
    const [authState, setAuthState] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState<string | undefined>(undefined);
    async function auth(event: FormEvent) {
        event.preventDefault();
        setIsError(authState?await SignIn(email, password):await SignUp(email, password));
    };

    return (
        <div>
            <h1>{authState?'ログイン':'アカウントを新規作成'}</h1>
            <form onSubmit={auth}>
                <input
                    type='email'
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='メールアドレス'
                />
                {isError && isError in emailErrorMessages && <p>{emailErrorMessages[isError]}</p>}
                <input
                    type='password'
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='パスワード(6文字以上)'
                />
                {isError && isError in passwordErrorMessages && <p>{passwordErrorMessages[isError]}</p>}
                <button type='submit'>続ける</button>
            </form>
            <button onClick={() => setAuthState(!authState)}>{authState?'アカウントを新規作成':'アカウントをお持ちの方'}</button>
        </div>
    );
}

export default AuthForm;