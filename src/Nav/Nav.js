import {observer} from "mobx-react-lite";
import logo from './../images/logo.svg';
import {Link} from "react-router-dom";

const Nav = observer(()=> {
    return (
        <div className="nav w-screen fixed">
            <div className="container mx-auto grid grid-cols-12">
                <img className="block" src={logo} alt=""/>
                <span className="col-span-8"/>
                <Link className="hover:text-rose-light self-center font-semibold text-white justify-self-end" to="/">Home</Link>
                <Link className="hover:text-rose-light self-center font-semibold text-white justify-self-end" to="/calculator">Calculator</Link>
                <Link className="hover:text-rose-light self-center font-semibold text-white justify-self-end" to="/checker">Checker</Link>
            </div>
        </div>
    )
});

export default Nav;