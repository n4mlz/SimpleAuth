import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentReference, doc, getDoc } from "firebase/firestore";
import { db, sendProfile } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import "../style/SetProfile.css"
import defaultIcon from "../assets/default-icon.png";

const genderList: { [key: string]: string }[] = [
    { name: "男性", value: "male" },
    { name: "女性", value: "female" },
    { name: "回答しない", value: "custom" }
];

const SetProfile: React.FC = () => {

    const user = useAuthContext();
    const navigate = useNavigate();

    const [displayName, setdisplayName] = useState<string | undefined>(undefined);
    const [photoFile, setphotoFile] = useState<File | undefined>(undefined);
    const [photoURL, setphotoURL] = useState<string>(defaultIcon);
    const [birth, setBirth] = useState<string | undefined>(undefined);
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [isError, setIsError] = useState<boolean>(false);
    const [initialized, setInitialized] = useState<boolean>(false);


    // プロフィール画像が選択された時, stateを更新
    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const fileObject = e.target.files[0];
        setphotoFile(fileObject);
        setphotoURL(window.URL.createObjectURL(fileObject));
    };


    // プロフィールの入力形式が正しい場合はfirebaseに保存
    const sendInfo = async (event: FormEvent) => {
        event.preventDefault();
        // エラーが発生した場合はtrueが返る
        if (user) setIsError(await sendProfile(user, displayName, photoFile, photoURL, birth, gender));
    }


    // 以前に入力した情報がある場合は以前の情報で初期化する
    const setInit = async () => {
        const profileRef: DocumentReference = doc(db, "profile", String(user?.uid));
        const data = (await getDoc(profileRef)).data();
        setInitialized(true);
        setdisplayName(data?.displayName);
        setBirth(data?.birth);
        setGender(data?.gender);
        if (data?.photoURL) setphotoURL(data.photoURL);
    }

    useEffect(() => {(async () => setInit())()}, [user]);

    return (
        <div className="block">
            <h1 className="headline">プロフィールを編集</h1>
            <form className="block-content" onSubmit={sendInfo}>
                <label className="big-icon">
                    <img className="icon" src={photoURL} />
                    <input type="file" accept="image/*" className="file-input" onChange={onFileInputChange} />
                </label>
                {isError && photoURL == defaultIcon && <p className="separate error">アイコンを設定してください。</p>}
                <p className="item-title">ユーザー名</p>
                <input placeholder="ユーザー名" defaultValue={displayName} onChange={(event) => setdisplayName(event.target.value)} />
                {isError && displayName == undefined && <p className="separate error">ユーザー名を入力してください。</p>}
                <p className="item-title">生年月日</p>
                <input type="date" defaultValue={birth} onChange={(event) => setBirth(event.target.value)} />
                {isError && birth == undefined && <p className="separate error">生年月日を入力してください。</p>}
                <p className="item-title">性別</p>
                <div className="radio">
                    {genderList.map((element) => (
                        <div key={element.value}>
                            <input type="radio" name="gender" id={element.value} value={element.value} onChange={(event) => setGender(event.target.value)} />
                            <label htmlFor={element.value}>
                                {element.name}
                            </label>
                        </div>
                    ))}
                </div>
                {isError && gender == undefined && <p className="separate error">性別を入力してください。</p>}
                <button type="submit" className="item-submit">保存</button>
                {initialized && <button className="item-submit white-button" onClick={() => navigate("/")}>戻る</button>}
            </form>
        </div>
    )
}

export default SetProfile;