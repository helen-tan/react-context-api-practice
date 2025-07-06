import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
}

const inititalState: TimersState = {
    isRunning: false,
    timers: []
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
        throw new Error('Timers Context is null - TimersContext must be used inside the TimersContextProvider');
    }

    return timersContext;
}

// * Context Providers - fn responsible for:
// - managing state & functions in this context
// - sharing/making the context available to all components, without having to pass props down manually at every level
type TimersContextProviderProps = {
    children: ReactNode
}

type StartTimersAction = {
    type: 'START_TIMERS'
}

type StopTimersAction = {
    type: 'STOP_TIMERS'
}

type AddTimersAction = {
    type: 'ADD_TIMER',
    payload: Timer // if types not seperated out like this, payload will have to be optional and we will keep having to convinve ts that payload is not null
}

type Action = StartTimersAction | StopTimersAction | AddTimersAction // union type

// 1st arg - the accumulator. current state before latest action was processed
// 2nd arg - action. commonly objects - says an action and some data belonging to the action
function timersReducer(state: TimersState, action: Action): TimersState {
    if (action.type === 'START_TIMERS') {
        return {
            ...state, // copy old state - don't lose data we are not changing
            isRunning: true
        }
        // should not manipulate the state directly
        // e.g. state.isRunning = true
        // always produce a new state
    }

    if (action.type === 'STOP_TIMERS') {
        return {
            ...state,
            isRunning: false
        }
    }

    if (action.type === 'ADD_TIMER') {
        return {
            ...state,
            timers: [...state.timers, 
                    { name: action.payload.name, duration: action.payload.duration}]
        }
    }

    return state;
}

function TimersContextProvider(props: TimersContextProviderProps) {
    const { children } = props;

    // useReducer returns an arr of 2 elems
    // 1. current state managed by useReducer (like the accumulator in normal js reducers)
    // 2. a dispatch fn - allows us to send 'messages' that will cause a state change
    const [timersState, dispatch] = useReducer(timersReducer, inititalState);

    // reducer - fn called when we 'dispatch' an action

    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({type: 'ADD_TIMER', payload: timerData});
        },
        startTimers() {
            dispatch({type: 'START_TIMERS'});
        },
        stopTimers() {
            dispatch({type: 'STOP_TIMERS'});
        }
    }

    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    );
}

export default TimersContextProvider;