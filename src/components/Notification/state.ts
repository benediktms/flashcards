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

type SetNotificationlocation = {
  type: 'SET_NOTIFICATION_LOCATION';
  location: NotifcationLocation;
};

export type NotificationAction =
  | AddNotificationAction
  | RemoveNotificationAction
  | SetNotificationlocation;

export type NotificationState = {
  notifications: Notification[];
  location: NotifcationLocation;
};

export const initialNotificationState: NotificationState = {
  notifications: [],
  location: 'top-right',
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
    case 'SET_NOTIFICATION_LOCATION':
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
};
