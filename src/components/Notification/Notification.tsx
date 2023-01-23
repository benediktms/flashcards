import { cn } from '../../utils/cn';
import { useNotification } from './useNotification';
import { type Notification as Props } from './state';
import { IoIosClose } from 'react-icons/io';

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
        'mr-3 rounded-md p-3 shadow-lg',
        // TODO: should allow the notification to be based on the Notification location
        // This means the parent element needs to be 100% of the current scren size,
        // taking into account if the window size changes (e.g. if the user resizes the window)
      )}
    >
      <div className="flex justify-between">
        <strong>{title}</strong>
        <>
          {isClosable && (
            <button onClick={() => closeNotification(id)}>
              <IoIosClose />
            </button>
          )}
        </>
      </div>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
