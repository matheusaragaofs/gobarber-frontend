import styled from 'styled-components';

export const Container = styled.div``;
export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    //primeira imagem, abaixo do header content, e não em outros níveis
    height: 80px;
  }

  button {
    margin-left: auto; // fazer ele ocupar todo o espaço possível, da esquerda dele com margem.
    background: transparent;
    border: 0;

    svg {
      //todo icone no react é um svg
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    margin-right: 10px;
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;
