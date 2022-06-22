import React from 'react';
import "./UserPostInfo.css";

interface UserInfo {
    userName: string;
    postTime: string;
}

const UserPostInfo: React.FC<UserInfo> = ({ userName, postTime }) => {
    console.log("Hi");
    return (
        <div>
            Users Information:<br/>
            Name: {userName}<br/>
            Time: {postTime}
        </div>
    );
};

export default UserPostInfo;