import DraggableNode from './DraggableNode';
const NodesPanel = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                alignItems: 'center',
                flexBasis: '25vw',
                padding: 16,
            }}
        >
            <DraggableNode type={'text'} label={'Message'} icon='message-icon.png' />
        </div>
    );
};

export default NodesPanel;
