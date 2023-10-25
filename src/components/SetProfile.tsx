import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
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
    const [initData, setInitData] = useState<{ [key: string]: string }>({});


    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const fileObject = e.target.files[0];
        setIconFile(fileObject);
        setIconURL(window.URL.createObjectURL(fileObject));
    };

    const sendProfile = async (event: FormEvent) => {
        event.preventDefault();
        if (user && username && iconURL && birth && gender) {
            try {
                var photoURL: string | undefined = undefined;
                if (iconURL.includes("firebasestorage.googleapis.com")) {
                    photoURL = iconURL;
                } else if (iconFile) {
                    const iconRef = ref(storage, "user-image/" + user?.uid + "/icon." + iconFile.name.split('.').pop());
                    await uploadBytes(iconRef, iconFile);
                    photoURL = await getDownloadURL(iconRef);
                }
                updateProfile(user, { displayName: username, photoURL: photoURL });
                const profileRef = doc(db, "profile", String(user?.uid));
                setDoc(profileRef, {
                    userId: user.uid,
                    displayName: username,
                    photoURL: photoURL,
                    birth: birth,
                    gender: gender
                });
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        } else {
            setIsError(true);
        }
    }

    const setInit = async () => {
        const profileRef = doc(db, "profile", String(user?.uid));
        const data = (await getDoc(profileRef)).data();
        setInitData({
            displayName: data?.displayName,
            photoURL: data?.photoURL,
            birth: data?.birth,
            gender: data?.gender
        });
        setIconURL(data?.photoURL);
    }

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
            <form onSubmit={sendProfile}>
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
                {initData.displayName && <Link to="/">ホームへ</Link>}
                <button type="submit">保存</button>
            </form>
        </div>
    )
}

export default SetProfile;