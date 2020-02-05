import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { saveItem } from '../../utils/localStorage';
import { errMessage, successMessage } from '../../utils/message';
import { API_URL, PORTAL_URL } from '../../config';

const Login = (props) => {
  const { toggle, isOpen, showResendModal } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/login/email`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      const data = await response.json();
      errMessage(data['message']);
      return;
    }

    const data = await response.json();

    if (data['email_verified']) {
        successMessage('Login successfully');
        saveItem('token', data['access_token']);
        props.setLoggedIn();
        toggle();
        return;
    }
    saveItem('isUserVerified', 0);
    saveItem('temp_token', data['access_token']);
    saveItem('email', email);
    toggle();
    showResendModal();
    // window.location.replace(`${PORTAL_URL}/home`);
 }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Log In</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
        <Button color="primary" onClick={(e) => handleLogin(e)}>Log In</Button>
      </ModalFooter>
    </Modal>
  );
}

export default Login;