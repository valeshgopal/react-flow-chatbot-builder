const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType }
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={type}
            onDragStart={(event) => onDragStart(event, 'text')}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            style={{
                cursor: 'grab',
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #29bcc5',
                borderRadius: '8px',
                padding: '8px 16px',
            }}
            draggable
        >
            <img src={icon} style={{ width: 50 }} />
            <span style={{ color: '#29bcc5', fontWeight: 500 }}>{label}</span>
        </div>
    );
};

export default DraggableNode