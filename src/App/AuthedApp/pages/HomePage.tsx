import s from './HomePage.module.scss';
import { Navigate } from 'react-router'
import CoffeeTableSvg from '../HomePage/CoffeeTableSvg';
import { useAuth } from 'src/contexts/AuthContext';


const HomePage = () => {
    const { currUser } = useAuth();

    if (!currUser) return <Navigate to="/login"/>
    
    return (
        <div className={s.wrap}>
            <div className={s.svgWrap}>
                <h1>Let's get to work!</h1>
                <CoffeeTableSvg/>
            </div>
        </div>
    )
};
export default HomePage;