import { ReactNode } from 'react';
import { Route, Navigate } from 'react-router'

type Props = {
    authed: boolean;
    children: ReactNode;
};

const PrivateRoute = ({ authed, children }: Props) => {
    if (!authed) return <Navigate to="/login" replace />
    return <>{children}</>
}

export default PrivateRoute;