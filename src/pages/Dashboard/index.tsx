import React from 'react';
import { FiClock, FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NextAppointment,
  Calendar,
  Schedule,
} from './styles';

const Dashboard: React.FC = () => {
  const { singOut, user } = useAuth();

  console.log(user);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button onClick={singOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://instagram.frec23-1.fna.fbcdn.net/v/t51.2885-19/s150x150/147450544_112699784136535_1255431336229930767_n.jpg?_nc_ht=instagram.frec23-1.fna.fbcdn.net&_nc_ohc=gBRCGeWHftsAX9-8FDr&tp=1&oh=f72e994a954a4a7c3de8bec00f43166d&oe=6056225C"
                alt="Matheus"
              />
              <strong>Matheus Aragão</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
