import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { GroupMessageType, MessageType } from '../../utils/types';
import { SelectedMessageContextMenu } from '../context-menus/SelectedMessageContextMenu';
import { selectConversationMessage } from '../../store/messages/messageSlice';
import { selectGroupMessage } from '../../store/groupMessageSlice';
import { selectType } from '../../store/selectedSlice';
import { MessageItemHeader } from './MessageItemHeader';
import { useHandleClick, useKeydown } from '../../utils/hooks';
import { UserAvatar } from '../users/UserAvatar';
import { MessageItemContainer, MessageItemDetails } from '../../utils/styles';
import {
  editMessageContent,
  resetMessageContainer,
  setContextMenuLocation,
  setIsEditing,
  setSelectedMessage,
  toggleContextMenu,
} from '../../store/messageContainerSlice';
import { SystemMessageList } from './system/SystemMessageList';
import { AuthContext } from '../../utils/context/AuthContext';
import { MessageItemContainerBody } from './MessageItemContainerBody';

export const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );
  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );
  const selectedType = useSelector((state: RootState) => selectType(state));
  const { showContextMenu } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const handleKeydown = (e: KeyboardEvent) =>
    e.key === 'Escape' && dispatch(setIsEditing(false));
  const handleClick = () => dispatch(toggleContextMenu(false));

  useKeydown(handleKeydown, [id]);
  useHandleClick(handleClick, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id]);

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType | GroupMessageType
  ) => {
    e.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageContent(e.target.value));

  const mapMessages = (
    message: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[]
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const prevMessage = messages[index - 1];
    const showMessageHeader =
      messages.length === index + 1 ||
      currentMessage.author.id !== nextMessage.author.id;
    const showAvatar =
      currentMessage.author.id !== user?.id &&
      prevMessage?.author.id !== currentMessage.author.id;
    const owner = user?.id === message.author.id;
    return (
      <div
        className={`flex w-full items-center gap-2 py-[1px] ${
          owner ? 'justify-between' : ''
        }`}
        key={message.id}
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showAvatar ? (
          <UserAvatar user={message.author} size="small" />
        ) : (
          <div className="w-[26px]"></div>
        )}
        {/* {showMessageHeader ? (
          <MessageItemDetails>
            <MessageItemHeader message={message} />
            <MessageItemContainerBody
              message={message}
              onEditMessageChange={onEditMessageChange}
              padding="8px 0 0 0"
              owner={user?.id === message.author.id}
            />
          </MessageItemDetails>
        ) : ( */}
        <MessageItemContainerBody
          message={message}
          onEditMessageChange={onEditMessageChange}
          padding="0 0 0 70px"
          owner={user?.id === message.author.id}
        />
        {/* )} */}
      </div>
    );
  };

  return (
    <div
      className="box-border py-[10px] flex flex-col overflow-y-auto"
      onScroll={(e) => {
        const node = e.target as HTMLDivElement;
        const scrollTopMax = node.scrollHeight - node.clientHeight;
        if (-scrollTopMax === node.scrollTop) {
          console.log('');
        }
      }}
    >
      <div className="flex flex-col-reverse">
        <SystemMessageList />
        {selectedType === 'private'
          ? conversationMessages?.messages.map(mapMessages)
          : groupMessages?.messages.map(mapMessages)}
      </div>
      {showContextMenu && <SelectedMessageContextMenu />}
    </div>
  );
};
