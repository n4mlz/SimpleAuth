import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '../firebase';

function SignInForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    async function signin(event: FormEvent) {
        event.preventDefault();
        await SignIn(email, password);
    };

    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={signin}>
                <input
                    type='email'
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type='password'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type='submit'>続ける</button>
            </form>
            <Link to='/signup'>アカウントを新規作成</Link>
        </div>
    );
}

export default SignInForm;