import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '../firebase';

var emailErrorMessages: {[key:string]:string} = {
    'auth/invalid-email': 'メールアドレスの形式が間違っています。',
    'auth/user-disabled': 'ユーザーは無効になっています。',
    'auth/user-not-found': 'ユーザーが存在しません。',
    'auth/invalid-login-credentials': 'メールアドレスまたはパスワードが間違っています。'
}

var passwordErrorMessages: {[key:string]:string} = {
    'auth/wrong-password': 'パスワードが間違っています。',
    'auth/too-many-requests': '何度もパスワードを間違えたため、一時的に機能が制限されています。',
    'auth/invalid-login-credentials': 'メールアドレスまたはパスワードが間違っています。'
}

function SignInForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState<string | undefined>(undefined);
    async function signin(event: FormEvent) {
        event.preventDefault();
        setIsError(await SignIn(email, password));
    };

    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={signin}>
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
            <Link to='/signup'>アカウントを新規作成</Link>
        </div>
    );
}

export default SignInForm;