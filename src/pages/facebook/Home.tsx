import { Camera, Plus } from 'akar-icons';
import { BiPhotoAlbum, BiSmile } from 'react-icons/bi';
import { UserAvatar } from '../../components/users/UserAvatar';
import { useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { User } from '../../utils/types';
import PostCardView from '../../components/facebook/home/PostCardView';

const Home = () => {
  const { user } = useContext(AuthContext);

  const post = {};

  return (
    <div className="flex">
      <div className="flex-2"></div>
      <div className="flex-3 mt-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <div className="w-[40px] text-primary-blue h-[40px] rounded-full bg-blue-100 flex items-center justify-center">
            <Plus size={20} />
          </div>
          <div className="">
            <p className="font-semibold">Create story</p>
            <p className="text-[15px] text-secondary-gray">
              Share a photo or write something.
            </p>
          </div>
        </div>

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
          <div className="flex justify-around mt-3 font-semibold text-secondary-gray">
            <div className="flex gap-2 items-center">
              <Camera color="red" />
              <span>Live video</span>
            </div>
            <div className="flex gap-2 items-center">
              <BiPhotoAlbum color="green" size={24} />
              <span>Photo/video</span>
            </div>
            <div className="flex gap-2 items-center">
              <BiSmile color="orange" size={28} />
              <span>Feeling/activity</span>
            </div>
          </div>
        </div>

        <PostCardView post={post} />
      </div>
      <div className="flex-2"></div>
    </div>
  );
};

export default Home;
