import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { saveItem } from '../../utils/localStorage';
import { API_URL, PORTAL_URL } from '../../config';

const SignUp = (props) => {
  const { toggle, isOpen, showResendModal } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/signup/email`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    // const data = {
    //   message: 'success',
    //   access_token: 'access_token',
    // }

    if (data['message'] === 'error') {
      setError('Sign up failed');
      return;
    }
    if (data['message'] === 'success') {
      saveItem('isUserVerified', 0);
      saveItem('temp_token', data['access_token']);
      saveItem('email', username);
      toggle();
      showResendModal();
      return;
    } 
    saveItem('token', data['access_token']);
    window.location.replace(`${PORTAL_URL}/home`);
 }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter your emailr" onChange={(e) => setUsername(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
        <Button color="primary" onClick={(e) => handleSignUp(e)}>Sign Up</Button>
      </ModalFooter>
    </Modal>
  );
}

export default SignUp;