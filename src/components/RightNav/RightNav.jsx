import { useDispatch, useSelector } from "react-redux";
import "./RightNav.scss";
import axios from "axios";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";



const RightNav = () => {

    const { translateMode } = useContext(DarkModeContext);

    // const dispatch = useDispatch();




    // console.log(friends)
    return (
        <div className="rightBar">
            <span>
                {
                    translateMode ?
                        'Suggestions For You' :
                        'أشخاص قد تعرفهم'
                }
            </span>
            <div className="container">
                <div className="item">
                    motasm
                    {/* <RandomFriend /> */}
                </div>
                {/* <span>
                    {
                        translateMode ?
                            'Online Friend' :
                            'الأصدقاء المتاحين'
                    }
                </span>
                <div className="item">
                    {onlineFreind.map(friend => {
                        return (
                            <div className="user">
                                <Link to={`profile/${friend.id}`}>

                                    <div className="userInfo">
                                        {
                                            friend.profile_image ?
                                                <img src={`http://localhost:8000/user/${friend.profile_image}`} alt="" />
                                                : <img src={users} />
                                        }
                                        <span>{friend.name}</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div> */}
            </div>

        </div>
    );
}

export default RightNav;