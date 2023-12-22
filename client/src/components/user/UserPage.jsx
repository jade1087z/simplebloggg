import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import firebase from "../../firebase.js"


const UserPage = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [currentImage, setCurrentImage] = useState("");


    useEffect(() => {
        if(user.isLoading && !user.accessToken) {
            navigate("/login");
        } else {
            setCurrentImage(user.photoURL)
        }
    }, [user])

    const ImageUpload = (e) => {
        const formData = new FormData();
        formData.append("file", (e.target.files[0]));
    
        axios.post("/api/user/proflie/img", formData)
            .then((response) => {
                console.log(response);
                setCurrentImage(response.data.filePath)
            })
        
    }

    const SaveProfile = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().currentUser.updateProfile({
                photoURL: currentImage
            })
        } catch (err) {
            return alert("실패")
        }

        let body = {
            photoURL: currentImage,
            uid: user.uid
        }
        console.log(currentImage)
        axios.post("/api/user/profile/update", body).then((response) => {
            if(response.data.success) {
                alert("성공")
                window.location.reload();
            } else {
                return alert("실패")
            }
        })
    }


  return (
    <div className='mypage'>
        <form>
            <label>
                <input type="file" accept='image/=' onChange={(e) => ImageUpload(e)} />
                <Avatar size="100" round={true} src={currentImage} />
            </label>
            <button onClick={(e) => SaveProfile(e)}>저장하기</button>
        </form>
    </div>
  )
}

export default UserPage