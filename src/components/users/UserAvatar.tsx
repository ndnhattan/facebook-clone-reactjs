import { FC } from 'react';
import { CDN_URL } from '../../utils/constants';
import { UserAvatarContainer } from '../../utils/styles';
import { User } from '../../utils/types';
import defaultAvatar from '../../__assets__/default_avatar.jpg';

type Props = {
  user: User;
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  size?: string;
};

export const UserAvatar: FC<Props> = ({ user, onClick, size }) => {
  const getProfilePicture = () => {
    const { profile } = user;
    return profile && profile.avatar
      ? CDN_URL.BASE.concat(profile.avatar)
      : defaultAvatar;
  };

  return (
    <img
      className={`${
        size === 'small' ? `w-[26px] h-[26px] border` : 'w-[50px] h-[50px]'
      } cursor-pointer rounded-full`}
      src={getProfilePicture()}
      alt="avatar"
      onClick={onClick}
    />
  );
};
