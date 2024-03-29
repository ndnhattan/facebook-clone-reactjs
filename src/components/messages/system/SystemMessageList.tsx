import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SystemMessage } from './SystemMessage';

export const SystemMessageList = () => {
  const { messages } = useSelector((state: RootState) => state.systemMessages);
  return (
    <div style={{ margin: '' }}>
      {messages.map((message) => (
        <SystemMessage message={message} />
      ))}
    </div>
  );
};
