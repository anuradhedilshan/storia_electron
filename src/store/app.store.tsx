import React, { createContext, useReducer } from "react";

export type States = {
  proxyList: string[];
  workingList: string[];
  filters: {
    estate: string;
    transaction: string;
    city: string;
    range?: number;
  };
  dataObj: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]; // You can specify the actual type of "data" array
    counter: number | string;
    updatedAt: Date;
  };
  searchLoading: boolean;
  progress: number | boolean;
  completed: boolean;
  filePath: string;
  running: boolean;
  threads: number;
};

const InitialValues: States = {
  proxyList: [],
  workingList:[],
  filters: {
    estate: "FLAT",
    transaction: "SELL",
    city: "toata-romania",
    range: 10,
  },
  dataObj: {
    data: [],
    counter: "N/A",
    updatedAt: new Date(),
  },
  searchLoading: false,
  progress: false,
  completed: true,
  filePath: "N/A",
  running: true,
  threads: 4,
};

enum ActionType {
  SET_IPLIST,
  GET_IPLIST,
  SET_FILTER_VALUES,
  GET_FILTER_VALUE,
  SETSEARCHLOADING,
  SETCOUNT,
  SETPROGRESS,
  SET_AS_COMPLETE,
  SET_FILE_PATH,
  SET_RUNNING_STATE,
  SET_THREAD,
  SET_WORKING_PROXY_LIST
}

interface Action {
  type: ActionType;
  payload: any; // You can specify the actual payload type based on the ActionType
}

function reducer(state: States, action: Action) {
  switch (action.type) {
    case ActionType.SET_IPLIST:
      return { ...state, proxyList: [...state.proxyList, ...action.payload] };
    // Add other cases for different actions if needed
    case ActionType.SET_FILTER_VALUES:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ActionType.SETSEARCHLOADING:
      return { ...state, searchLoading: action.payload };
    case ActionType.SETCOUNT:
      return { ...state, dataObj: { ...action.payload } };
    case ActionType.SETPROGRESS:
      return { ...state, progress: action.payload };
    case ActionType.SET_AS_COMPLETE:
      return { ...state, completed: action.payload };
    case ActionType.SET_FILE_PATH:
      return { ...state, filePath: action.payload };
    case ActionType.SET_RUNNING_STATE:
      return { ...state, running: action.payload };
    case ActionType.SET_THREAD:
      return { ...state, threads: action.payload };
    case ActionType.SET_WORKING_PROXY_LIST:
      return { ...state, workingList: [...state.workingList, ...action.payload] };
    default:
      return state;
  }
}

const context = createContext<{
  state: States;
  dispatch: React.Dispatch<Action>;
}>({
  state: InitialValues,
  dispatch: () => null,
});

const Store = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, InitialValues);

  return (
    <context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { context, Store, ActionType };
