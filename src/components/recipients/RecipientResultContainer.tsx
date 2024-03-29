import { FC, useEffect } from 'react';
import {
  RecipientResultContainerStyle,
  RecipientResultItem,
  RecipientScrollableItemContainer,
} from '../../utils/styles';
import { User } from '../../utils/types';

type Props = {
  userResults: User[];
  handleUserSelect: (user: User) => void;
};

export const RecipientResultContainer: FC<Props> = ({
  userResults,
  handleUserSelect,
}) => {
  useEffect(() => {
    handleUserSelect(userResults[0]);
  }, [userResults]);
  return (
    <RecipientResultContainerStyle>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItem
            key={user.id}
            onClick={() => handleUserSelect(userResults[0])}
          >
            <span>{user.username}</span>
          </RecipientResultItem>
        ))}
      </RecipientScrollableItemContainer>
    </RecipientResultContainerStyle>
  );
};
