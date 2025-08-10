import logo from '../../assets/logo.png';
import {Container, ErrorCode, Logo, Message} from './styles';

export function NotFound() {
  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <ErrorCode>404</ErrorCode>
      <Message>Página não encontrada</Message>
    </Container>
  );
}
