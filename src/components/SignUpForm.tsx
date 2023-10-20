import { FormEvent, useState } from 'react';
import { SignUp } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';

function SignUpForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const user = useAuthContext();
    async function signup(event: FormEvent) {
        event.preventDefault();
        await SignUp(email, password);
        console.log(user?.email);
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
        </div>
    );
}

export default SignUpForm;