import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '../firebase';

function SignUpForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    async function signup(event: FormEvent) {
        event.preventDefault();
        await SignUp(email, password);
    };

    return (
        <div>
            <h1>アカウントを新規作成</h1>
            <form onSubmit={signup}>
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
            <Link to='/signin'>アカウントをお持ちの方</Link>
        </div>
    );
}

export default SignUpForm;