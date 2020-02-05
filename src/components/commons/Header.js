import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import SignUpModal from '../modals/SignUpModal';
import ResendEmailModal from '../modals/ResendEmailModal';
import LoginModal from '../modals/LoginModal';
import { saveItem, loadItem, removeItem } from '../../utils/localStorage';

function Header(props) {
    const [loggedIn, setLoggedIn] = useState(loadItem('token'));
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isResendEmailOpen, setIsResendEmailOpen] = useState(false);

    useEffect(() => {
        if (loadItem('isUserVerified') === 0 && !loggedIn) {
            setIsResendEmailOpen(true);
        }
    }, [])

    const toggleSignUp = () => setIsSignUpOpen(!isSignUpOpen);
    const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
    const toggleResendEmail = () => setIsResendEmailOpen(!isResendEmailOpen);

    const handleLogout = () => {
        saveItem('token', '');
        removeItem('isUserVerified');
        saveItem('temp_token', '');
        removeItem('email', '');
        props.setLoggedIn(false);
      }

    return (
        <div className="header">
            {
                loggedIn && <button type="button" className="btn-logout btn-secondary" onClick={() => handleLogout()}>Logout</button>

            }
            {
                !loggedIn && <button type="button" className="btn-login btn btn-primary" onClick={() => toggleLogin()}>Login</button>
            }
            {
                !loggedIn && <button type="button" className="btn-signup btn btn-secondary" onClick={() => toggleSignUp()}>Signup</button>
            }
            <LoginModal isOpen={isLoginOpen} toggle={toggleLogin} setLoggedIn={() => props.setLoggedIn(true)} showResendModal={() => setIsResendEmailOpen(true)}/>
            <SignUpModal isOpen={isSignUpOpen} toggle={toggleSignUp} showResendModal={() => setIsResendEmailOpen(true)}/>
            <ResendEmailModal isOpen={isResendEmailOpen} toggle={toggleResendEmail} />
        </div>
    );
}

export default withRouter(Header);