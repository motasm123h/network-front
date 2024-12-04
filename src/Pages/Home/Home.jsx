import LeftNav from "../../components/LeftNav/LeftNav";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.authReducer.authData)

    return (
        <div className="home">
            Home is here
        </div>
    )
}
