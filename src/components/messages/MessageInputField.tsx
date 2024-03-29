import { Dispatch, FC, SetStateAction, useState } from 'react';
import { CharacterLimit } from '../../utils/styles';
import { MessageTextField } from '../inputs/MessageTextField';
import { FaceVeryHappy } from 'akar-icons';
import styles from './index.module.scss';
import { MessageAttachmentActionIcon } from './MessageAttachmentActionIcon';

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  placeholderName: string;
  sendMessage: () => void;
  sendTypingStatus: () => void;
};

export const MessageInputField: FC<Props> = ({
  content,
  placeholderName,
  setContent,
  sendMessage,
  sendTypingStatus,
}) => {
  const MAX_LENGTH = 2048;
  const [isMultiLine, setIsMultiLine] = useState(false);
  const atMaxLength = content.length === MAX_LENGTH;

  return (
    <>
      <div
        className={` flex gap-[12px] relative  px-2 py-3 ${
          isMultiLine ? 'items-end' : 'items-center'
        }`}
      >
        <MessageAttachmentActionIcon isMultiLine={isMultiLine} />
        <form
          onSubmit={sendMessage}
          className={`w-full flex bg-primary-gray pl-3 gap-1 pr-2 py-[2px] rounded-3xl ${
            isMultiLine ? 'items-end' : 'items-center'
          }`}
        >
          <MessageTextField
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
          />
          <FaceVeryHappy
            className={isMultiLine ? 'mb-[6px]' : ''}
            size={24}
            color="#0084ff"
          />
        </form>
        {atMaxLength && (
          <CharacterLimit atMaxLength={atMaxLength}>
            {`${content.length}/${MAX_LENGTH}`}
          </CharacterLimit>
        )}
      </div>
    </>
  );
};
