import { useState, useContext } from 'react';
import { userSidebarItems } from '../../utils/constants';
import { UserSidebarItem } from './items/UserSidebarItem';
import { AuthContext } from '../../utils/context/AuthContext';
import { UpdatePresenceStatusModal } from '../modals/UpdatePresenceStatusModal';
import { logoutUser as logoutUserAPI } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import facebookIcon from '../../__assets__/facebook.png';
import { Search } from 'akar-icons';
import { UserAvatar } from '../users/UserAvatar';
import { User } from '../../utils/types';
import { AiFillMessage } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';

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
      <div className="flex items-center bg-white px-4 border-b w-full">
        <div className="flex flex-2 items-center gap-2 ">
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
        <div className="flex-3 flex items-center">
          {userSidebarItems.map((item) => (
            <UserSidebarItem item={item} key={item.id} />
          ))}
        </div>

        <div className="flex flex-2 items-center gap-2 justify-end">
          <Link
            to={'/messenger/conversations'}
            className="bg-primary-gray w-[40px] h-[40px] rounded-full flex items-center justify-center"
          >
            <AiFillMessage size={22} />
          </Link>
          <div className="bg-primary-gray w-[40px] h-[40px] rounded-full flex items-center justify-center">
            <IoMdNotifications size={24} />
          </div>
          <UserAvatar user={user as User} size="large" />
        </div>
      </div>
    </>
  );
};
