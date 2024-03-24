import { useContext } from 'react';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { InfoFill } from 'akar-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { initiateCallState } from '../../../store/call/callSlice';
import { selectConversationById } from '../../../store/conversationSlice';
import { CDN_URL, SenderEvents } from '../../../utils/constants';
import { AuthContext } from '../../../utils/context/AuthContext';
import { SocketContext } from '../../../utils/context/SocketContext';
import { getRecipientFromConversation } from '../../../utils/helpers';
import { CallInitiatePayload, CallType } from '../../../utils/types';
import defaultAvatar from '../../../__assets__/default_avatar.jpg';

export const MessagePanelConversationHeader = () => {
  const user = useContext(AuthContext).user!;
  const { id } = useParams();
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getRecipientFromConversation(conversation, user);
  const buildCallPayloadParams = (
    stream: MediaStream,
    type: CallType
  ): CallInitiatePayload | undefined =>
    conversation && {
      localStream: stream,
      caller: user,
      receiver: recipient!,
      isCalling: true,
      activeConversationId: conversation.id,
      callType: type,
    };

  const videoCallUser = async () => {
    if (!recipient) return console.log('Recipient undefined');
    socket.emit('onVideoCallInitiate', {
      conversationId: conversation!.id,
      recipientId: recipient.id,
    });
    const constraints = { video: true, audio: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const payload = buildCallPayloadParams(stream, 'video');
    if (!payload) throw new Error('Video Call Payload is undefined.');
    dispatch(initiateCallState(payload));
  };

  const voiceCallUser = async () => {
    if (!recipient) return console.log('Recipient undefined');
    socket.emit(SenderEvents.VOICE_CALL_INITIATE, {
      conversationId: conversation!.id,
      recipientId: recipient.id,
    });
    const constraints = { video: false, audio: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const payload = buildCallPayloadParams(stream, 'audio');
    if (!payload) throw new Error('Voice Call Payload is undefined.');
    dispatch(initiateCallState(payload));
  };

  const hasProfilePicture = () => recipient?.profile?.avatar;

  return (
    <div className="h-[65px] py-1 px-2 w-full border-b flex items-center justify-between shadow">
      <div
        className={`flex items-center gap-2 py-[6px] px-2  cursor-pointer rounded-lg hover:bg-primary-gray`}
      >
        <img
          src={
            hasProfilePicture()
              ? CDN_URL.BASE.concat(recipient?.profile?.avatar!)
              : defaultAvatar
          }
          alt="avatar"
          className="h-[40px] w-[40px] rounded-full"
        />
        <div className="break-all flex flex-col flex-1">
          <span className="font-semibold">
            {`${recipient?.firstName} ${recipient?.lastName}`}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-2">
        <div className="flex items-center justify-center rounded-full hover:bg-primary-gray w-10 h-10">
          <FaPhoneAlt
            color="#0084ff"
            size={20}
            cursor="pointer"
            onClick={voiceCallUser}
          />
        </div>

        <div className="flex items-center justify-center rounded-full hover:bg-primary-gray w-10 h-10">
          <FaVideo
            color="#0084ff"
            size={22}
            cursor="pointer"
            onClick={videoCallUser}
          />
        </div>

        <div className="flex items-center justify-center rounded-full hover:bg-primary-gray w-10 h-10">
          <InfoFill color="#0084ff" size={22} />
        </div>
      </div>
    </div>
  );
};
