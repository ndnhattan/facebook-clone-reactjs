import { ChatAdd, MoreHorizontalFill, Search } from 'akar-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  setContextMenuLocation,
  setSelectedGroup,
  toggleContextMenu,
} from '../../store/groupSlice';
import { ContextMenuEvent, Group } from '../../utils/types';
import { ConversationSidebarItem } from '../conversations/ConversationSidebarItem';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { CreateGroupModal } from '../modals/CreateGroupModal';

export const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  const showGroupContextMenu = useSelector(
    (state: RootState) => state.groups.showGroupContextMenu
  );
  const groups = useSelector((state: RootState) => state.groups.groups);
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const onGroupContextMenu = (event: ContextMenuEvent, group: Group) => {
    event.preventDefault();
    console.log('Group Context Menu');
    console.log(group);
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: event.pageX, y: event.pageY }));
    dispatch(setSelectedGroup(group));
  };

  useEffect(() => {
    const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="border-r w-[500px]">
      {showModal && conversationType === 'private' && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === 'group' && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <div className="flex flex-col h-full ">
        <div className="px-4 py-2 border-b">
          <div className="flex justify-between">
            <span className="text-2xl font-bold">Chats</span>
            <div className="flex gap-3">
              <div className="cursor-pointer rounded-full bg-primary-gray w-9 h-9 flex items-center justify-center">
                <MoreHorizontalFill size={22} />
              </div>
              <div
                className="cursor-pointer rounded-full bg-primary-gray w-9 h-9 flex items-center justify-center"
                onClick={() => setShowModal(true)}
              >
                <ChatAdd size={22} />
              </div>
            </div>
          </div>
          <div className="bg-primary-gray rounded-3xl mt-3 flex items-center px-2 py-1 gap-1">
            <Search size={20} />
            <input
              className="bg-inherit outline-none w-full mr-1"
              placeholder="Search Messenger"
            />
          </div>
        </div>

        <div className="px-2 overflow-y-auto">
          {conversations.map((conversation) => (
            <ConversationSidebarItem
              key={conversation.id}
              conversation={conversation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
