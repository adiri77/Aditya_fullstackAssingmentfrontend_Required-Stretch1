import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';// Ensure this path is correct

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth(); 
    console.log(user,"hadfcjjvjvjsvjsvdvjd");// Now using user object
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the home page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">MyAssesment</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Browse Students</Link>
                    </li>
                    {isAuthenticated && user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/edit-profile/${user}`}>Edit Profile</Link> {/* Assuming `user.id` is the correct property */}
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-outline-success my-2 my-sm-0" type="button">Log out</button>
                            </li>
                        </>
                    )}
                    {!isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
