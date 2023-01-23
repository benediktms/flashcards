export type NotificationType = 'error' | 'info' | 'success' | 'warning';
export type NotifcationLocation =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export type Notification = {
  id: number;
  type: NotificationType;
  title?: string;
  message?: string;
  location?: NotifcationLocation;
  isClosable: boolean;
};
type AddNotificationAction = {
  type: 'ADD_NOTIFICATION';
  payload: Notification;
};

type RemoveNotificationAction = {
  type: 'REMOVE_NOTIFICATION';
  id: number;
};

export type NotificationAction =
  | AddNotificationAction
  | RemoveNotificationAction;

export type NotificationState = {
  notifications: Notification[];
};

export const initialNotificationState: NotificationState = {
  notifications: [],
};

export const notificationReducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.id,
        ),
      };
    default:
      return state;
  }
};
