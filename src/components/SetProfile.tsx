import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DocumentReference, doc, getDoc } from "firebase/firestore";
import { db, sendProfile } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import defaultIcon from "../assets/default-icon.png"

const genderList: { [key: string]: string }[] = [
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
    const [initData, setInitData] = useState<{ [key: string]: string }>({});


    // プロフィール画像が選択された時, stateを更新
    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const fileObject = e.target.files[0];
        setIconFile(fileObject);
        setIconURL(window.URL.createObjectURL(fileObject));
    };


    // プロフィールの入力形式が正しい場合はfirebaseに保存
    const sendInfo = async (event: FormEvent) => {
        event.preventDefault();
        // エラーが発生した場合はtrueが返る
        setIsError(await sendProfile(user, username, iconFile, iconURL, birth, gender));
    }


    // 以前に入力した情報がある場合は以前の情報で初期化する
    const setInit = async () => {
        const profileRef: DocumentReference = doc(db, "profile", String(user?.uid));
        const data = (await getDoc(profileRef)).data();
        setInitData({
            displayName: data?.displayName,
            photoURL: data?.photoURL,
            birth: data?.birth,
            gender: data?.gender
        });
        setIconURL(data?.photoURL);
    }

    
    // サインイン済みでないまたはメール認証済みでない場合はページ遷移
    useEffect(() => {
        if (user) {
            user.emailVerified ? null : navigate('/verify');
            setInit();
        } else {
            navigate("/signin");
        };
    }, [user])

    return (
        <div>
            <h1>プロフィールを編集</h1>
            <form onSubmit={sendInfo}>
                <input placeholder="ユーザー名" defaultValue={initData.displayName} onChange={(event) => setUsername(event.target.value)} />
                {isError && username == undefined && <p>ユーザー名を入力してください。</p>}
                <img src={iconURL} />
                <input type="file" accept="image/*" onChange={onFileInputChange} />
                {isError && iconURL == undefined && <p>アイコンを設定してください。</p>}
                <input type="date" placeholder="生年月日" defaultValue={initData.birth} onChange={(event) => setBirth(event.target.value)} />
                {isError && birth == undefined && <p>生年月日を入力してください。</p>}
                {genderList.map((element) => (
                    <label key={element.value}>
                        <input type="radio" name="gender" value={element.value} onChange={(event) => setGender(event.target.value)} />
                        {element.name}
                    </label>
                ))}
                {isError && gender == undefined && <p>性別を入力してください。</p>}
                {initData.displayName && <Link to="/">次へ</Link>}
                <button type="submit">保存</button>
            </form>
        </div>
    )
}

export default SetProfile;