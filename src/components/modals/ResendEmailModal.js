import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { loadItem } from '../../utils/localStorage';
import { API_URL } from '../../config';
import { errMessage, successMessage } from '../../utils/message';

const ResendEmailModal = (props) => {
    const [disabled, setDisabled] = useState(false);

    const { isOpen, toggle } = props;

    const email = loadItem('email');

    const handleResendEmail = async (e) => {
        e.preventDefault();
        setDisabled(true);
        const response = await fetch(`${API_URL}/verify/resend-email`, {
            method: 'GET',
           headers: {
               Authorization: `Bearer ${loadItem('temp_token')}`,
           },
        });
        const data = await response.json();
        // const data = {
        //     message: 'success',
        // }
        setDisabled(false);
        if (data['message'] === 'success') {
            successMessage('Resent Successfully');
        }
    }

    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Verify your email</ModalHeader>
        <ModalBody>
            <div style={{ textAlign: 'center' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <p>We've sent an email to <b>{email}</b>. Click the verification link in the email to verify.</p>
            <p>If you don’t see the email, check other places it might be, like your junk, spam, social, or other folders. Or you can click the button below to resend email.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleResendEmail(e)} disabled={disabled}>Resend Email</Button>
        </ModalFooter>
      </Modal>
    )
}

export default ResendEmailModal;
