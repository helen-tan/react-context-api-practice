import { createContext } from "react";

type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void
} // this object contains methods for manipulating state values in TimersState - will be accessed by other components in the app 

// Eventually, the contaxt TimersContext will manage the object TimersContextValue
// which contains the state values in TimersState
const TimersContext = createContext<TimersContextValue | null>(null);