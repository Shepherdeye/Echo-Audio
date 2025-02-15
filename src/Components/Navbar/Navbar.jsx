import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-slate-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Echo App</h1>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
                    <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
                    <li><Link to="/echo" className="hover:text-blue-400">Echo</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
