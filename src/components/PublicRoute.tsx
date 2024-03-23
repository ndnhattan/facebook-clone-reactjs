import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';

export const PublicRoute: FC<React.PropsWithChildren> = () => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) {
    return <div>loading</div>;
  }
  if (!user)
    return (
      <>
        {' '}
        <Outlet />
      </>
    );
  return <Navigate to="/conversations" state={{ from: location }} replace />;
};
