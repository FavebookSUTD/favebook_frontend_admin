import { message } from 'antd';

export default function* notificationsHandler(messageLevel, messageContent) {
  message.config({
    duration: 5,
    maxCount: 5,
  });

  try {
    yield message[messageLevel](messageContent);
  } catch {
    yield message.info(messageContent);
  }
}
