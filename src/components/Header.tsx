import { useTimersContext } from '../store/timers-context.tsx';
import Button from './UI/Button.tsx';

export default function Header() {
  const timersContext = useTimersContext();

  const handleButtonClick = () => {
    if (timersContext.isRunning) {
      timersContext.stopTimers()
    } else {
      timersContext.startTimers()
    }
  }

  return (
    <header>
      <h1>ReactTimer</h1>
     {/* OR: onClick={timersContext.isRunning ? timersContext.stopTimers : timersContext.startTimers} */}
      <Button onClick={handleButtonClick}>{timersContext.isRunning ? 'Stop' : 'Start'} Timers</Button>
    </header>
  );
}
