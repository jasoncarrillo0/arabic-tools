import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import s from './HomePage.module.scss';
import { Redirect } from 'react-router-dom'
const HomePage = ({}) => {
    const { currUser, signup } = useAuth();

    if (!currUser) return <Redirect to="/signup"/>
    
    return (
        <div className={s.wrap}>
            Welcome!
        </div>
    )
};
export default HomePage;