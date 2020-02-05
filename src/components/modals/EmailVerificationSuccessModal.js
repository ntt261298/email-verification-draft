import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { loadItem, saveItem } from '../../utils/localStorage';

const EmailVerificationSuccessModal = (props) => {
    const { isOpen, hideModal } = props;

    const handleContinue = (e) => {
        e.preventDefault();
        saveItem('token', loadItem('temp_token'));
        saveItem('isUserVerified', 1);
        props.setLoggedIn();
        hideModal();
        props.history.push('/home');
    }

    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Congratulation</ModalHeader>
        <ModalBody>
            <p>You've verified your email. Click the button below to login back to the portal</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) =>  handleContinue(e)}>Continue</Button>
        </ModalFooter>
      </Modal>
    )
}

export default withRouter(EmailVerificationSuccessModal);