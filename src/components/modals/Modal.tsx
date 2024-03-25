import { FC } from 'react';
import { OverlayStyle } from '../../utils/styles';

type Props = {
  children: React.ReactNode;
};

export const Modal: FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full z-50 bg-[#fcfcfdbb]">
      {children}
    </div>
  );
};
