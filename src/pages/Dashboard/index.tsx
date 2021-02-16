import React, { useCallback, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import 'react-day-picker/lib/style.css'; // importando a estilização day picker
import DayPicker, { DayModifiers } from 'react-day-picker';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
  Schedule,
} from './styles';

const Dashboard: React.FC = () => {
  const { singOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers) {
      setSelectedDate(day);
    }
  }, []);
  console.log(selectedDate);
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

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://instagram.frec23-1.fna.fbcdn.net/v/t51.2885-19/s150x150/147450544_112699784136535_1255431336229930767_n.jpg?_nc_ht=instagram.frec23-1.fna.fbcdn.net&_nc_ohc=gBRCGeWHftsAX9-8FDr&tp=1&oh=f72e994a954a4a7c3de8bec00f43166d&oe=6056225C"
                  alt="Matheus"
                />
                <strong>Matheus Aragão</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://instagram.frec23-1.fna.fbcdn.net/v/t51.2885-19/s150x150/147450544_112699784136535_1255431336229930767_n.jpg?_nc_ht=instagram.frec23-1.fna.fbcdn.net&_nc_ohc=gBRCGeWHftsAX9-8FDr&tp=1&oh=f72e994a954a4a7c3de8bec00f43166d&oe=6056225C"
                  alt="Matheus"
                />
                <strong>Eduardo </strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://instagram.frec23-1.fna.fbcdn.net/v/t51.2885-19/s150x150/147450544_112699784136535_1255431336229930767_n.jpg?_nc_ht=instagram.frec23-1.fna.fbcdn.net&_nc_ohc=gBRCGeWHftsAX9-8FDr&tp=1&oh=f72e994a954a4a7c3de8bec00f43166d&oe=6056225C"
                  alt="Matheus"
                />
                <strong>Arimin</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            fromMonth={new Date()} // A partir do mês atual
            disabledDays={[{ daysOfWeek: [0, 6] }]} // sábados e domingos desabilitados
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
