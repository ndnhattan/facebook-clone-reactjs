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

  const sz =
    size === 'small'
      ? 'w-[26px] h-[26px]'
      : size === 'large'
      ? 'w-[40px] h-[40px]'
      : 'w-[50px] h-[50px]';

  return (
    <img
      className={`${sz} cursor-pointer rounded-full border`}
      src={getProfilePicture()}
      alt="avatar"
      onClick={onClick}
    />
  );
};
