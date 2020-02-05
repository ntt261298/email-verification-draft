import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import SignUpModal from '../modals/SignUpModal';
import ResendEmailModal from '../modals/ResendEmailModal';
import { saveItem, loadItem } from '../../utils/localStorage';

function Header(props) {
    const [loggedIn, setLoggedIn] = useState(loadItem('token'));
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isResendEmailOpen, setIsResendEmailOpen] = useState(false);

    useEffect(() => {
        console.log(loadItem('isUserVerified'));
        if (loadItem('isUserVerified') === 0) {
            setIsResendEmailOpen(true);
        }
    }, [])

    const toggleSignUp = () => setIsSignUpOpen(!isSignUpOpen);
    const toggleResendEmail = () => setIsResendEmailOpen(!isResendEmailOpen);

    const handleLogout = () => {
        saveItem('token', '');
        props.setLoggedIn(false);
      }

    return (
        <div className="header">
            {
                loggedIn && <button type="button" className="btn-logout" onClick={() => handleLogout()}>Logout</button>

            }
            {
                !loggedIn && <button type="button" className="btn-signup" onClick={() => toggleSignUp()}>Signup</button>
            }
            <SignUpModal isOpen={isSignUpOpen} toggle={toggleSignUp} showResendModal={() => setIsResendEmailOpen(true)}/>
            <ResendEmailModal isOpen={isResendEmailOpen} toggle={toggleResendEmail} />
        </div>
    );
}

export default withRouter(Header);