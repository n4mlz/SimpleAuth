import { User } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { isProfileSet, useAuthContext } from "../contexts/AuthContext";

// ページを閲覧する権限がない場合の権限レベル別の遷移先
const transitionTo: string[] = ["/signin", "/verify", "setprofile", "/"]

// それぞれのページを閲覧できる権限レベルのリスト
const requiredPermission: { [key: string]: number[] } = {
    "/signin": [0],
    "/signup": [0],
    "/reset": [0],
    "/verify": [1],
    "/setprofile": [2, 3],
    "/": [3]
};

const getPermissionLevel = async (user: User | null | undefined) => {
    if (user == undefined) return undefined;
    if (user == null) return 0;
    if (!user.emailVerified) return 1;
    if (! await isProfileSet(user)) return 2;
    return 3;
};

const PageTransition = () => {
    (async () => {
        const user = useAuthContext();
        const location = useLocation();
        const navigate = useNavigate();

        const permissionLevel = await getPermissionLevel(user);
        if (permissionLevel == undefined) return undefined;

        const currentPath = location.pathname;
        if (!requiredPermission[currentPath].includes(permissionLevel)) navigate(transitionTo[permissionLevel]);
    })();

    return <></>
}

export default PageTransition;