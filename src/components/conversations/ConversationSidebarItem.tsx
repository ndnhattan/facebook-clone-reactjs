import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CDN_URL } from '../../utils/constants';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromConversation } from '../../utils/helpers';
import defaultAvatar from '../../__assets__/default_avatar.jpg';

type Props = {
  conversation: any;
};

export const ConversationSidebarItem: React.FC<Props> = ({ conversation }) => {
  const MESSAGE_LENGTH_MAX = 50;
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const recipient = getRecipientFromConversation(conversation, user);
  const lastMessageContent = () => {
    const { lastMessageSent } = conversation;
    if (lastMessageSent && lastMessageSent.content)
      return lastMessageSent.content?.length >= MESSAGE_LENGTH_MAX
        ? lastMessageSent.content?.slice(0, MESSAGE_LENGTH_MAX).concat('...')
        : lastMessageSent.content;
    return null;
  };

  const hasProfilePicture = () => recipient?.profile?.avatar;

  return (
    <div
      className={`flex items-center gap-3 py-2 px-2 w-full cursor-pointer rounded-lg ${
        id == conversation.id ? 'bg-[#ebf5ff]' : 'hover:bg-primary-gray'
      }`}
      onClick={() => navigate(`/messenger/conversations/${conversation.id}`)}
    >
      <img
        src={
          hasProfilePicture()
            ? CDN_URL.BASE.concat(recipient?.profile?.avatar!)
            : defaultAvatar
        }
        alt="avatar"
        className="h-[56px] w-[56px] rounded-full"
      />
      <div className="break-all flex flex-col flex-1">
        <span className="font-semibold">
          {`${recipient?.firstName} ${recipient?.lastName}`}
        </span>
        <span className="text-sm">{lastMessageContent()}</span>
      </div>
    </div>
  );
};
