import Container from './UI/Container.tsx';
import { Timer as TimerProps } from '../store/timers-context.tsx';

export default function Timer(props: TimerProps) {
  const { name, duration } = props;

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
}
