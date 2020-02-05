import React from 'react';
import Header from '../components/commons/Header';

const Home = (props) => (
    <div className="container">
        <Header setLoggedIn={props.setLoggedIn} />
        <h3>Welcome Home Page!</h3>
    </div>
)

export default Home;
