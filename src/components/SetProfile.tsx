import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
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
        if (user) setIsError(await sendProfile(user, username, iconFile, iconURL, birth, gender));
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
        if (data?.photoURL) setIconURL(data.photoURL);
    }

    setInit();

    return (
        <div className="block">
            <h1 className="headline">プロフィールを編集</h1>
            <form className="block-content" onSubmit={sendInfo}>
                <label className="editting-icon">
                    <img className="icon" src={iconURL} />
                    <input type="file" accept="image/*" className="file-input" onChange={onFileInputChange} />
                </label>
                {isError && iconURL == defaultIcon && <p className="separate error">アイコンを設定してください。</p>}
                <p className="item-title">ユーザー名</p>
                <input placeholder="ユーザー名" defaultValue={initData.displayName} onChange={(event) => setUsername(event.target.value)} />
                {isError && username == undefined && <p className="separate error">ユーザー名を入力してください。</p>}
                <p className="item-title">生年月日</p>
                <input type="date" defaultValue={initData.birth} onChange={(event) => setBirth(event.target.value)} />
                {isError && birth == undefined && <p className="separate error">生年月日を入力してください。</p>}
                <p className="item-title">性別</p>
                <div className="radio">
                    {genderList.map((element) => (
                        <>
                            <input type="radio" name="gender" id={element.value} value={element.value} onChange={(event) => setGender(event.target.value)} />
                            <label key={element.value} htmlFor={element.value}>
                                {element.name}
                            </label>
                        </>
                    ))}
                </div>
                {isError && gender == undefined && <p className="separate error">性別を入力してください。</p>}
                {initData.displayName && <Link to="/">次へ</Link>}
                <button type="submit" className="item-submit">保存</button>
            </form>
        </div>
    )
}

export default SetProfile;