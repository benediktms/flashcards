import React, {
  useCallback,
  createContext,
  useReducer,
  type PropsWithChildren,
} from 'react';
import {
  type NotificationState,
  type NotificationType,
  type NotifcationLocation as NotificationLocation,
  initialNotificationState,
  notificationReducer,
} from './state';
import { Notification } from './Notification';

type NotificationContextValue = {
  notifications: NotificationState['notifications'];
  notify: (input: {
    type: NotificationType;
    message: string;
    title?: string;
    location?: NotificationLocation;
    duration?: number;
    isClosable?: boolean;
  }) => void;
  closeNotification: (id: number) => void;
};

export const NotificationContext = createContext<
  NotificationContextValue | undefined
>(undefined);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialNotificationState,
  );

  const closeNotification = (id: number) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      id,
    });
  };

  const notify = (input: {
    type: NotificationType;
    message: string;
    title?: string;
    location?: NotificationLocation;
    duration?: number;
    isClosable?: boolean;
  }) => {
    const id = state.notifications.length;
    const {
      type,
      message,
      title,
      location = 'top-right',
      duration = 5000,
      isClosable = true,
    } = input;
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id,
        type,
        title,
        message,
        location,
        isClosable,
      },
    });
    setTimeout(() => {
      closeNotification(id);
    }, duration);
  };

  const showNotification = useCallback(
    () => (
      <>
        {state.notifications.map((n) => (
          <Notification
            key={n.id}
            type={n.type}
            id={n.id}
            message={n.message}
            title={n.title}
            isClosable={n.isClosable}
          />
        ))}
      </>
    ),
    [state],
  );

  const value: NotificationContextValue = {
    notifications: state.notifications,
    notify,
    closeNotification,
  };

  return (
    <>
      <NotificationContext.Provider value={value}>
        <div className="fixed left-0 top-0 z-50 flex h-fit w-full flex-col items-end justify-center gap-3 pt-10">
          {showNotification()}
        </div>
        {children}
      </NotificationContext.Provider>
    </>
  );
};
