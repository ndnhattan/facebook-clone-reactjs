import { useState, useContext } from 'react';
import { userSidebarItems } from '../../utils/constants';
import { UserSidebarItem } from './items/UserSidebarItem';
import { AuthContext } from '../../utils/context/AuthContext';
import { UpdatePresenceStatusModal } from '../modals/UpdatePresenceStatusModal';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { logoutUser as logoutUserAPI } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import facebookIcon from '../../__assets__/facebook.png';
import { Search } from 'akar-icons';

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
      <div className="flex items-center bg-white px-2 border-b">
        <div className="flex items-center gap-2 px-2">
          <img src={facebookIcon} width={40} height={40} alt="" />
          <div className="flex items-center bg-primary-gray rounded-3xl py-2 px-[10px] gap-2">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search Facebook"
              className="bg-inherit rounded-r-3xl outline-none w-[200px]"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center">
          {userSidebarItems.map((item) => (
            <UserSidebarItem item={item} key={item.id} />
          ))}
        </div>

        <div className="py-[18px]">
          <RiLogoutCircleLine size={30} onClick={() => logoutUser()} />
        </div>
      </div>
    </>
  );
};
