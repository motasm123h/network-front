import "./LeftNav.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const LeftNav = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    const { data } = useSelector((state) => state.authReducer.authData);
    const { translateMode } = useContext(DarkModeContext);

    return (
        <>
            <div className="leftBar">
                <div className="container">
                    <div className="menu">
                        <Link to={`/profile/${data.id}`}>
                            <div className="user">

                                <span>{data.name}</span>
                            </div>
                        </Link>
                        <hr />

                        <Link to="/createGroup">
                            <div className="item" >
                                <span>
                                    {
                                        translateMode ?
                                            'Create Group' :
                                            'انشئ مجموعة'
                                    }
                                </span>
                            </div>
                        </Link>

                        <Link to="/displayMyGroup">
                            <div className="item" >
                                <span>
                                    {
                                        translateMode ?
                                            'Display Group' :
                                            'عرض مجموعاتي'
                                    }
                                </span>
                            </div>
                        </Link>
                        <Link to="/displayGroup">
                            <div className="item" >
                                <span>
                                    {
                                        translateMode ?
                                            'Display All Group' :
                                            'عرض المجموعات'
                                    }
                                </span>
                            </div>
                        </Link>
                        <Link to="/">
                            <div className="item" >
                                <span>
                                    {
                                        translateMode ?
                                            'Delete Group' :
                                            'حذف مجموعة'
                                    }
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="menu">
                        <span>
                            {
                                translateMode ?
                                    'Files ' :
                                    'الملفات'

                            }
                        </span>
                        <hr />

                        <Link to="">
                            <div className="item">
                                <span>
                                    {
                                        translateMode ?
                                            'Add file' :
                                            'أضف ملفك'

                                    }
                                </span>
                            </div>
                        </Link>
                        <Link to="">
                            <div className="item">
                                <span>
                                    {
                                        translateMode ?
                                            'Get Reports' :
                                            'طلب التقارير'

                                    }
                                </span>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </>

    );
};

export default LeftNav;