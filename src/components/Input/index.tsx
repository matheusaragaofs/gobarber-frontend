import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons'; // propriedades que um ícone pode ter
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // ao extender, essa interface pode receber todas as propriedades do input do html
  name: string; // pra forçar ser obrigatório
  icon?: React.ComponentType<IconBaseProps>; // Quando eu quero receber um componente como uma propriedade, que vai ser o ícone
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);
export default Input;
