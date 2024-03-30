import React, { useContext } from 'react';
import { UserAvatar } from '../../users/UserAvatar';
import { User } from '../../../utils/types';
import { AuthContext } from '../../../utils/context/AuthContext';

type Props = {
  post: any;
};

const PostCardView: React.FC<Props> = ({ post }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white px-4 py-3 rounded-lg shadow flex flex-col mt-4">
      <div className="flex items-center gap-3">
        <UserAvatar size="large" user={user as User} />

        <input
          type="text"
          className="w-full outline-none bg-primary-gray px-3 py-2 rounded-3xl"
          placeholder={`What's on your mind, ${user?.firstName}?`}
        />
      </div>
      <hr className="w-full mt-3" />
      <div className="flex justify-around mt-3 font-semibold text-secondary-gray"></div>
    </div>
  );
};

export default PostCardView;
