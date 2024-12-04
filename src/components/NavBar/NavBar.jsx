import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './NavBar.scss'

import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";



export default function Navbar() {
    // const dispatch = useDispatch();
    const { data } = useSelector((state) => state.authReducer.authData);
    const { translateMode } = useContext(DarkModeContext);
    const { toggle, darkMode, } = useContext(DarkModeContext);

    return (
        <div className="navbar">
            <div className="left">
                <div className="user">
                    <Tippy content="User Name">
                    </Tippy>
                    <span>{data.name}</span>
                </div>
                <div className="nav-icon">

                    <Link to="/">
                        <Tippy content="Home Bage">
                            <HomeOutlinedIcon />
                        </Tippy>
                    </Link>
                    <Tippy content="light Mood and dark Mood">
                        {darkMode ? (
                            <WbSunnyOutlinedIcon onClick={toggle} />

                        )
                            : (
                                <DarkModeOutlinedIcon onClick={toggle} />
                            )}
                    </Tippy>
                </div>

                {/* <hr /> */}
                <div className="nav-link">

                    <Link to="/createGroup" >
                        <div className="item" >
                            <Tippy content="This for Create your own groups">
                                <span>
                                    {
                                        translateMode ?
                                            'Create Group' :
                                            'انشئ مجموعة'
                                    }
                                </span>
                            </Tippy>
                        </div>
                    </Link>

                    <Link to="/displayMyGroup">
                        <div className="item" >
                            <Tippy content="This for Display Your Groups">
                                <span>
                                    {
                                        translateMode ?
                                            'My Group' :
                                            'عرض مجموعاتي'
                                    }
                                </span>
                            </Tippy>
                        </div>
                    </Link>

                    <Link to="/displayGroup">
                        <div className="item" >
                            <Tippy content="This for Display all the groups you are not join to it">
                                <span>
                                    {
                                        translateMode ?
                                            'All Group' :
                                            'عرض المجموعات'
                                    }
                                </span>
                            </Tippy>
                        </div>
                    </Link>
                    <Link to="/invitiation">
                        <div className="item" >
                            <Tippy content="This for Display all the invitiation you are get">
                                <span>
                                    {
                                        translateMode ?
                                            'invitiation' :
                                            'الدعوات'
                                    }
                                </span>
                            </Tippy>
                        </div>
                    </Link>

                </div>
            </div>
            <div className="right">
            </div>
        </div>
    );
};