import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const SetProfile: React.FC = () => {
    const user = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            user.emailVerified?null:navigate('/verify');
        } else {
            navigate("/signin");
        };
    }, [user])
    return (<div></div>)
}

export default SetProfile;