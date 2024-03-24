import { useState, useContext } from 'react';
import { userSidebarItems } from '../../utils/constants';
import { UserSidebarItem } from './items/UserSidebarItem';
import { AuthContext } from '../../utils/context/AuthContext';
import { UpdatePresenceStatusModal } from '../modals/UpdatePresenceStatusModal';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { UserAvatar } from '../users/UserAvatar';
import { logoutUser as logoutUserAPI } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, updateAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    logoutUserAPI().finally(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      updateAuthUser(undefined);
      navigate('/login', { replace: true });
    });
  };

  return (
    <>
      {showModal && <UpdatePresenceStatusModal setShowModal={setShowModal} />}
      <div className="flex flex-col items-center flex-[0_0_80px] bg-[#15161E]">
        <header className="h-[90px] flex items-center justify-center border-b border-[#494949a9] w-full box-border">
          <UserAvatar user={user!} onClick={() => setShowModal(true)} />
        </header>
        <div className="w-full h-full flex flex-col items-center">
          {userSidebarItems.map((item) => (
            <UserSidebarItem item={item} />
          ))}
        </div>

        <footer className="py-[18px]">
          <RiLogoutCircleLine size={30} onClick={() => logoutUser()} />
        </footer>
      </div>
    </>
  );
};
