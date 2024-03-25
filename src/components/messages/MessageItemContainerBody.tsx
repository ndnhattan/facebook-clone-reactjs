import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MessageItemContent } from '../../utils/styles';
import { GroupMessageType, MessageType } from '../../utils/types';
import { MessageItemAttachmentContainer } from './attachments/MessageItemAttachmentContainer';
import { EditMessageContainer } from './EditMessageContainer';

type Props = {
  message: MessageType | GroupMessageType;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  padding: string;
  owner: boolean;
};

export const MessageItemContainerBody: FC<Props> = ({
  message,
  onEditMessageChange,
  padding,
  owner,
}) => {
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  return (
    <>
      {isEditingMessage && message.id === messageBeingEdited?.id ? (
        <MessageItemContent padding={padding}>
          <EditMessageContainer onEditMessageChange={onEditMessageChange} />
        </MessageItemContent>
      ) : (
        <div
          className={`w-full whitespace-pre-wrap rounded-2xl px-2 ${
            owner ? 'bg-primary-blue text-white' : 'bg-primary-gray '
          }`}
        >
          {message.content || null}
          <MessageItemAttachmentContainer message={message} />
        </div>
      )}
    </>
  );
};
