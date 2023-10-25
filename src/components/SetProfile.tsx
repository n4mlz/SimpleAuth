import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import defaultIcon from "../assets/default-icon.png"

const genderList = [
    { name: "男性", value: "male" },
    { name: "女性", value: "female" },
    { name: "回答しない", value: "custom" }
];

const SetProfile: React.FC = () => {

    const user = useAuthContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string | undefined>(undefined);
    const [iconFile, setIconFile] = useState<File | undefined>(undefined);
    const [iconURL, setIconURL] = useState<string>(defaultIcon);
    const [birth, setBirth] = useState<string | undefined>(undefined);
    const [gender, setGender] = useState<string | undefined>(undefined);

    const [isError, setIsError] = useState<boolean>(false);


    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const fileObject = e.target.files[0];
        setIconFile(fileObject);
        setIconURL(window.URL.createObjectURL(fileObject));
    };

    const sendProfile = (event: FormEvent) => {
        event.preventDefault();
        if (username && iconFile && birth && gender) {
            console.log('set');
        } else {
            setIsError(true);
        }
    }

    useEffect(() => {
        if (user) {
            user.emailVerified ? null : navigate('/verify');
        } else {
            navigate("/signin");
        };
    }, [user])

    return (
        <div>
            <h1>プロフィールを編集</h1>
            <form onSubmit={sendProfile}>
                <input placeholder="ユーザー名" onChange={(event) => setUsername(event.target.value)} />
                {isError && username == undefined && <p>ユーザー名を入力してください。</p>}
                <img src={iconURL} />
                <input type="file" accept="image/*" onChange={onFileInputChange} />
                {isError && iconFile == undefined && <p>アイコンを設定してください。</p>}
                <input type="date" placeholder="生年月日" onChange={(event) => setBirth(event.target.value)} />
                {isError && birth == undefined && <p>生年月日を入力してください。</p>}
                {genderList.map((element) => (
                    <label key={element.value}>
                        <input type="radio" name="gender" value={element.value} onChange={(event) => setGender(event.target.value)} />
                        {element.name}
                    </label>
                ))}
                {isError && gender == undefined && <p>性別を入力してください。</p>}
                <button type="submit">保存</button>
            </form>
        </div>
    )
}

export default SetProfile;