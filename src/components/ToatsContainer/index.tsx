import React from 'react';
import { useTransition } from 'react-spring'; // permite controlar a transição de um elemento quando ele entra em tela e quando ele sai da tela
import Toast from './Toast';
import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages, // minhas mensagens
    message => message.id, // função que vai obter qual é a key (informação única )da minha mensagem
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }, // objeto contendo animações,
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => {
        // props são as propriedades de estilização
        return <Toast key={key} style={props} message={item} />;
      })}
    </Container>
  );
};

export default ToastContainer;
