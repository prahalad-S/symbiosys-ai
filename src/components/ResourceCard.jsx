import React from 'react';

function ResourceCard({ item, onClick }) {
  const linkUrl = item.linkUrl || item.url || '#';

  return (
    <div 
      className="resource-card" 
      role="button" 
      tabIndex="0"
      onClick={() => onClick(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item);
        }
      }}
    >
      <div className="resource-header">
        <div className="resource-brand">
          <div className="resource-logo">{item.name.charAt(0)}</div>
          <div className="resource-title">{item.name}</div>
        </div>
        {item.badges && item.badges.length > 0 && (
          <div className="resource-badges">
            {item.badges.map((b, i) => (
              <span key={i} className={`badge-${b.toLowerCase()}`}>{b}</span>
            ))}
          </div>
        )}
      </div>
      <p className="resource-desc">{item.description}</p>
      <div className="resource-footer">
        {item.tags && item.tags.map((t, i) => (
          <span key={i} className="resource-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

export default ResourceCard;
