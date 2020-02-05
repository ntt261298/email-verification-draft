import React from 'react';
import Header from '../components/commons/Header';

const Landing = (props) => (
    <div className="container">
        <Header setLoggedIn={props.setLoggedIn} />
        <h3>Welcome Landing Page!</h3>
    </div>
)

export default Landing;
