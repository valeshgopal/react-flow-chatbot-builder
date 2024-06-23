import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useNode } from '../context/node';

export const TextNode = ({ id, data }) => {
    const { dispatch, selectedNode } = useNode();
    const [text, setText] = useState('');

    useEffect(() => {
        if (selectedNode?.id === id) {
            setText(selectedNode?.text);
        }
    }, [id, selectedNode?.text]);

    return (
        <div
            style={{
                width: 200,
                height: 80,
                border:
                    selectedNode?.id === id ? '1.5px solid #000' : '1px solid #29bcc5',
                borderRadius: 8,
                boxShadow: selectedNode?.id === id && '0 0 10px rgba(0,0,0,0.1)',
            }}
            onClick={() =>
                dispatch({
                    type: 'SET_SELECTED_NODE',
                    payload: { ...selectedNode, id, data, text },
                })
            }
        >
            <div
                style={{
                    backgroundColor: '#29bcc5',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    padding: '4px 8px',
                }}
            >
                <p style={{ fontSize: 14 }}>Send message</p>
            </div>
            <p style={{ fontSize: 14, padding: '0 6px' }}>{text}</p>
            <Handle type='source' position={Position.Right} id={`${id}-output`} />
            <Handle type='target' position={Position.Left} id={`${id}-input`} />
        </div>
    );
};
