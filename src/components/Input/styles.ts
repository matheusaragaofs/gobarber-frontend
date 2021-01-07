import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129; // Deixa uma borda da mesma cor pra futuramente  mudar para caso ocorra erros
  padding: 16px;
  width: 100%;
  color: #666360;

  & + div {
    margin-top: 8px;
  }
  display: flex;
  align-items: center;
  svg {
    margin-right: 16px;
  }
  input {
    color: #f4ede8;
    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #666360;
    }
  }
`;
