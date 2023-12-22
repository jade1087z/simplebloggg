import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import RepleContent from './RepleContent';

const RepleList = (props) => {
    const [repleList, setRepleList] = useState([]);

    useEffect(() => {
        let body = {
            postId: props.postId
        }
        axios.post("/api/reple/getReple", body).then((res) => {
            if(res.data.success) {
                setRepleList([...res.data.repleList])
            }
        }, [props.postId])
    })

  return (
    <div>
        {repleList.map((reple, idx) => ( 
                <div key={idx} className='reple'> 
                    <RepleContent reple={reple} repleId={reple.author}/>
                </div>
        ))}
    </div>
  )
}

export default RepleList