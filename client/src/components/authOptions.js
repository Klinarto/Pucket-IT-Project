import { Button } from "antd";
import React, { useContext } from "react";
import user_context from "../context/user_context";

function AuthOptions() {
    const {userData, setUserData} = useContext(user_context);
    const logout = () => {
        setUserData({token: undefined, user: undefined});
        localStorage.setItem("auth-token", "");
    };

    return (
        <div>
            {userData.token ? (<button onClick={logout}>logout</button>) : (<button>login</button>)}
        </div>
    );
}

export default AuthOptions;