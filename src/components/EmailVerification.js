import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
import { saveItem } from '../utils/localStorage';
import { API_URL } from '../config';
import { loadItem } from '../utils/localStorage';
import EmailVerificationSuccessModal from '../components/modals/EmailVerificationSuccessModal';
import EmailVerificationFailModal from '../components/modals/EmailVerificationFailModal';

const EmailVerification = (props) => {
    const [verifyStatus, setVetifyStatus] = useState('');
    const hideModal = () => setVetifyStatus('');

    useEffect(() => {
        const { token } = queryString.parse(props.location.search)

        if (!token) {
          props.history.push('/home');
          return;   
        }
        fetch(`${API_URL}/verify/email`, {
            method: 'POST',
            headers: {
             Authorization: `Bearer ${loadItem('temp_token')}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: token }),
        }).then(res => {
            if (res.status === 200) {
                setVetifyStatus('success');
                saveItem('isUserVerified', true);
                return;
            }
            setVetifyStatus('fail');
        })
    }, [])

    return (
        <div className="container">
            <h3>Welcome Email Verification Page!</h3>
            <EmailVerificationSuccessModal setLoggedIn={() => props.setLoggedIn(true)} isOpen={verifyStatus === 'success'} hideModal={hideModal}/>
            <EmailVerificationFailModal isOpen={verifyStatus === 'fail'} hideModal={hideModal}/>
        </div>
    )
}

export default withRouter(EmailVerification);