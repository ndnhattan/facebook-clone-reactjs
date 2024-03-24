import { Dispatch, FC, SetStateAction, useState } from 'react';
import { CharacterLimit, MessageInputContainer } from '../../utils/styles';
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
      <div className="rounded-[5px] w-full py-2 flex gap-[12px] items-center relative">
        <MessageAttachmentActionIcon />
        <form
          onSubmit={sendMessage}
          className="w-full flex bg-primary-gray items-center pl-[12px] pr-2 py-[3px] rounded-3xl"
        >
          <MessageTextField
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
          />
          <FaceVeryHappy className={styles.icon} size={24} color="#0084ff" />
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
