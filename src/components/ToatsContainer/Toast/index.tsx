import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { Container } from './style';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);
  return (
    <Container
      type={message.type}
      style={style}
      hasdescription={Number(!!message.description)} // converte true p/ 1 e false p /0
    >
      {[icons[message.type || 'info']]}
      <div>
        <strong> {message.title}</strong>
        {message.description && <p>{message.description}</p>}
        <button onClick={() => removeToast(message.id)} type="button">
          {/* arrow function necessária pq se não ele ia chamar a função no momento em que fosse renderizado
  mas só queremos chamar a função quando apertar o botão */}
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>
  );
};

export default Toast;
