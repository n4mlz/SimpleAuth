import { FormEvent, useState } from 'react';

function SignUpForm() {
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    function signup(event: FormEvent) {
        event.preventDefault();
        console.log(email);
        console.log(password);
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