import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '../firebase';

var emailErrorMessages: {[key:string]:string} = {
    'auth/invalid-email': 'メールアドレスの形式が間違っています。',
    'auth/emailAlreadyInUse': 'このメールアドレスは既に使用されています。'
}

var passwordErrorMessages: {[key:string]:string} = {
    'auth/weak-password': 'パスワードは6文字以上で入力してください。'
}

function SignUpForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState<string | undefined>(undefined);
    async function signup(event: FormEvent) {
        event.preventDefault();
        setIsError(await SignUp(email, password));
    };

    return (
        <div>
            <h1>アカウントを新規作成</h1>
            <form onSubmit={signup}>
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
            <Link to='/signin'>アカウントをお持ちの方</Link>
        </div>
    );
}

export default SignUpForm;