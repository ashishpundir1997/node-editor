// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon, color }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          padding: '10px 16px',
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          borderRadius: '8px',
          background: 'hsl(0 0% 100%)',
          border: '1px solid hsl(214.3 31.8% 91.4%)',
          justifyContent: 'center', 
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        }} 
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'hsl(210 40% 96.1%)';
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 4px 12px ${color}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'hsl(0 0% 100%)';
          e.currentTarget.style.borderColor = 'hsl(214.3 31.8% 91.4%)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }}
      >
          {Icon && <Icon size={16} color={color} />}
          <span style={{ 
            color: 'hsl(222.2 47.4% 11.2%)',
            fontSize: '13px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
      </div>
    );
  };