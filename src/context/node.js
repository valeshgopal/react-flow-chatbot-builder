import { createContext, useContext, useReducer } from 'react';

const NodeContext = createContext();

const initialState = {
    selectedNode: null,
    nodeText: null,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_SELECTED_NODE':
            return {
                ...state,
                selectedNode: payload,
            };
    }
};

export const NodeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <NodeContext.Provider
            value={{
                selectedNode: state.selectedNode,
                dispatch,
            }}
        >
            {children}
        </NodeContext.Provider>
    );
};

export const useNode = () => useContext(NodeContext);
