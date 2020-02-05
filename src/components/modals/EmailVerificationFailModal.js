import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { loadItem, saveItem } from '../../utils/localStorage';

const EmailVerificationFailModal = (props) => {
    const { isOpen, hideModal } = props;
    const email = loadItem('email');

    const handleContinue = (e) => {
        e.preventDefault();
        saveItem('token', loadItem('temp_token'));
        hideModal();
        props.history.push('/home');
    }

    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>Invalid token</ModalHeader>
        <ModalBody>
            <p>Your verification token associate with <b>{email}</b> is invalid.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) =>  handleContinue(e)}>Ok, Gotit!</Button>
        </ModalFooter>
      </Modal>
    )
}

export default withRouter(EmailVerificationFailModal);