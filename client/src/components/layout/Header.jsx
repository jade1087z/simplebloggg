import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../firebase.js";

const Header = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    if (firebase.auth().currentUser) {
        console.log("사용자가 로그인한 상태입니다.");
    } else {
        console.log("사용자가 로그인하지 않은 상태입니다.");
    }
    console.log(isLoggedIn);

    const LogoutHandler = () => {
        firebase.auth().signOut();
        navigate("/");
    };

    return (
        <header id="header" role="banner">
            <div className="left">
                <h1 className="logo">
                    <Link to="/">webs ai</Link>
                </h1>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/list">List</Link>
                        </li>
                        <li>
                            <Link to="/write">Write</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="right">
                {isLoggedIn ? (
                    <ul>
                        <li>
                            <Link to={"/mypage"}>
                                {user.displayName}님 방가워요! 🥳
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => LogoutHandler()}>
                                로그아웃
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to="/login">로그인</Link>
                        </li>
                        <li>
                            <Link to="/Join">회원가입</Link>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header;
