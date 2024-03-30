import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../../store';
import { getUserSidebarIcon } from '../../../utils/helpers';
import { IconBadge } from '../../../utils/styles';
import { UserSidebarItemType } from '../../../utils/types';

type Props = {
  item: UserSidebarItemType;
};

export const UserSidebarItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const friendRequests = useSelector(
    (state: RootState) => state.friends.friendRequests
  );
  const Icon = getUserSidebarIcon(item.id);
  const ICON_SIZE = 24;
  const STROKE_WIDTH = 2;

  const isActive = () => {
    // if (pathname.includes('/groups') && item.id === 'conversations')
    //   return true;
    if (item.pathname === '/') return pathname === item.pathname;
    return pathname.includes(item.pathname);
  };
  return (
    <div
      className={`w-full flex items-center justify-center px-[18px] py-[14px] relative ${
        isActive()
          ? 'text-primary-blue border-b-[3px] border-primary-blue'
          : 'text-secondary-gray'
      }`}
      onClick={() => navigate(item.pathname)}
    >
      <Icon size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
      {item.id === 'friends' && friendRequests.length > 0 && (
        <IconBadge>
          {friendRequests.length > 9 ? '10+' : friendRequests.length}
        </IconBadge>
      )}
    </div>
  );
};
