import React from 'react';
import { useNode } from '../context/node';

const SettingsPanel = () => {
    const [text, setText] = React.useState('');
    const { selectedNode, dispatch } = useNode();

    React.useEffect(() => {
        setText(selectedNode?.text || '');
    }, [selectedNode?.id, selectedNode?.text]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                flexBasis: '25vw',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderBottom: '1px solid rgba(0,0,0,0.2)',
                    padding: 12,
                }}
            >
                <p
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        dispatch({ type: 'SET_SELECTED_NODE', payload: null });
                    }}
                >
                    ⬅️
                </p>
                <p>Message</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <textarea
                    value={text}
                    onChange={(e) =>
                        dispatch({
                            type: 'SET_SELECTED_NODE',
                            payload: { ...selectedNode, text: e.target.value },
                        })
                    }
                    style={{
                        width: '80%',
                        height: 100,
                        borderRadius: 8,
                        border: '1px solid rgba(0,0,0,0.2)',
                        padding: '4px 8px',
                    }}
                />
            </div>
        </div>
    );
};

export default SettingsPanel;
