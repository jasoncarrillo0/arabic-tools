import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import s from './HomePage.module.scss';
import { Redirect } from 'react-router-dom'
import CoffeeTableSvg from './HomePage/CoffeeTableSvg';
const HomePage = ({}) => {
    const { currUser } = useAuth();

    if (!currUser) return <Redirect to="/signup"/>
    
    return (
        <div className={s.wrap}>
            <h1>Let's get to work!</h1>
            <CoffeeTableSvg/>
        </div>
    )
};
export default HomePage;