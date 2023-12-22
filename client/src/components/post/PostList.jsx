import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const PostList = () => {
    const [postList, setPostList] = useState([]);
    const [sort, setSort ] = useState("최신순");
    const [ searchTerm, setSearchTerm ] = useState("")

    const inputRef = useRef();

    useEffect(() => {
        let body = {
            sort: sort,
            searchTerm: searchTerm
        }
        axios
            .post("/api/post/list", body)
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                    console.log(sort)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(searchTerm)
    }, [sort, searchTerm]);

    const SetTime = (a, b) => {
        if (a !== b) {
            return moment(b).format("YYYY-MM-DD" + "(수정됨)");
        } else {
            return moment(a).format("YYYY-MM-DD");
        }
    };

 

    const setSearchTem = () => {};

    const SearchHandler = () => {};
    return (
        <>
            <div className="login__header">
                <h3>List</h3>
                <p>잠깐 글좀 확인할까?</p>
            </div>
            <div className="search">
                <input type="text" ref={inputRef} onKeyDown={(e) => {
                    if(e.keyCode === 13){
                        setSearchTerm(e.currentTarget.value)
                    } 
                }} />
            <button onClick={(e) => setSearchTerm(inputRef.current.value)}>검색</button>
            </div>
            <div className="list__btn">
                <button onClick={() => setSort("최신순")}>최신순</button>
                <button onClick={() => setSort("인기순")}>인기순</button>
            </div>
            <div className="list__wrap">
                {postList.map((post, key) => {
                    console.log(post);
                    return (
                        <div className="list" key={key}>
                            <span className="cate">교육</span>
                            <h3 className="title">
                                <Link to={`/postArea/${post.postNum}`}>
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="desc">{post.content}</p>
                            <div className="auth">
                                {post.author.displayName}
                            </div>
                            <div>{SetTime(post.createdAt, post.updatedAt)}</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PostList;
