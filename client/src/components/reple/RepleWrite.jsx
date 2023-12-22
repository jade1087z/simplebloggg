import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const RepleWrite = (props) => {
  const [reple, setReple ] = useState("");
  const user = useSelector((state) => state.user)
  
  function SubmitHandler(e){
    e.preventDefault();

    if(!reple) {
        return alert("댓글 내용을 채워주세요");
    }
    console.log(props.postId)
    let body = {
        reple: reple,
        uid: user.uid,
        postId: props.postId
    }

    axios.post("/api/reple/submit", body).then((response) => {
        if(response.data.success) {
            alert("댓글 작성 완료");
        } else {
            alert("댓글 작성 실패"); 
        }
    })
  }

  return (
    <div className=''>
        <form>
          <input style={({border: "none"})} text="text" value={reple} onChange={(e) => { setReple(e.currentTarget.value)}} />
          <button onClick={(e) => {SubmitHandler(e)}}>댓글 쓰기</button>
        </form>
    
    </div>
  )
}

export default RepleWrite