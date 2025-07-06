import { createContext, ReactNode, useContext } from "react";

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
export const TimersContext = createContext<TimersContextValue | null>(null);

// custom hook - fn that must only be called inside a component function
// Do this so that every component calling this context don't have to check for null
export function useTimersContext() {
    const timersContext = useContext(TimersContext)

    if (timersContext === null) {
        throw new Error('Timers Context is null - that should not be the case');
    }

    return timersContext;
}

// * Context Providers - fn responsible for:
// - managing state & functions in this context
// - sharing/making the context available to all components, without having to pass props down manually at every level
type TimersContextProviderProps = {
    children: ReactNode
}

function TimersContextProvider(props: TimersContextProviderProps) {
    const { children } = props;

    const ctx: TimersContextValue = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {
            // ...
        },
        startTimers() {
            // ...
        },
        stopTimers() {
            // ...
        }
    }

    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    );
}

export default TimersContextProvider;