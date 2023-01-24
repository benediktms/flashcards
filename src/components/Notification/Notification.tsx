import { IoIosClose } from 'react-icons/io';

import { cn } from '../../utils/cn';
import { type Notification as Props } from './state';
import { useNotification } from './useNotification';

export const Notification: React.FC<Props> = ({
  type,
  id,
  title,
  message,
  isClosable = true,
}) => {
  const { closeNotification } = useNotification();

  return (
    <div
      className={cn(
        type === 'success'
          ? 'bg-green-300 text-green-700'
          : type === 'error'
          ? 'bg-red-300 text-red-700'
          : type === 'info'
          ? 'bg-blue-300 text-blue-700'
          : 'bg-yellow-300 text-yellow-700',
        'max-w-sm rounded-md p-3 shadow-lg',
      )}
    >
      <div className="flex justify-between">
        <strong>{title}</strong>
        {isClosable && (
          <button onClick={() => closeNotification(id)}>
            <IoIosClose />
          </button>
        )}
      </div>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
