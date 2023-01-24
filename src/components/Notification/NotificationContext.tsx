import React, {
  useCallback,
  createContext,
  useReducer,
  type PropsWithChildren,
} from 'react';

import { cn } from '../../utils/cn';
import { Notification } from './Notification';
import {
  type NotificationState,
  type NotificationType,
  type NotifcationLocation as NotificationLocation,
  initialNotificationState,
  notificationReducer,
} from './state';

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

export const NotificationProvider = ({ children }: PropsWithChildren) => {
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
    if (location) {
      setNotificationLocation(location);
    }

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id,
        type,
        title,
        message,
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

  const setNotificationLocation = (location: NotificationLocation) => {
    dispatch({
      type: 'SET_NOTIFICATION_LOCATION',
      location,
    });
  };

  const value: NotificationContextValue = {
    notifications: state.notifications,
    notify,
    closeNotification,
  };

  return (
    <>
      <NotificationContext.Provider value={value}>
        <div
          className={cn(
            state.location === 'top-right'
              ? 'top-0 right-0 items-end'
              : state.location === 'top-left'
              ? 'top-0 left-0'
              : state.location === 'bottom-right'
              ? 'bottom-0 right-0 items-end'
              : state.location === 'bottom-left'
              ? 'bottom-0 left-0'
              : state.location === 'top-center'
              ? 'top-0 items-center'
              : 'bottom-0 items-center',
            'fixed z-50 flex h-fit w-full flex-col justify-center gap-3 p-3',
          )}
        >
          {showNotification()}
        </div>
        {children}
      </NotificationContext.Provider>
    </>
  );
};
