import React from 'react';

const Header = ({ handleSave, onSaveMessage }) => {
    return (
        <div
            style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                height: '48px',
                display: 'flex',
                padding: '8px 54px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <div></div>
            {onSaveMessage && <p
                style={{
                    fontSize: 14,
                    backgroundColor:
                        onSaveMessage?.type === 'error' ? 'rgba(255,0,0,0.3)' : 'rgba(0,255,0,0.3)',
                    borderRadius: 8,
                    padding: '4px 8px',
                    fontWeight: 600
                }}
            >
                {onSaveMessage?.message}
            </p>}
            <button
                style={{
                    border: 0,
                    outline: 'none',
                    background: '#fff',
                    border: '1px solid #29bcc5',
                    borderRadius: 8,
                    padding: '6px 48px',
                    alignSelf: 'flex-start',
                    color: '#29bcc5',
                    cursor: 'pointer',
                }}
                onClick={handleSave}
            >
                Save Changes
            </button>
        </div>
    );
};

export default Header;
