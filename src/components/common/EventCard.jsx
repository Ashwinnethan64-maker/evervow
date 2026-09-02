import React from 'react';
import './EventCard.css';

export const EventCard = ({
  name,
  date,
  time,
  venue,
  attire,
  description,
  className = ''
}) => {
  return (
    <article className={`editorial-event-card ${className}`}>
      <div className="event-card-inner">
        <span className="event-date-badge">{date}</span>
        <h3 className="event-name">{name}</h3>
        
        <div className="event-meta-list">
          {time && (
            <div className="event-meta-item">
              <span className="meta-label">Time</span>
              <span className="meta-value">{time}</span>
            </div>
          )}
          {venue && (
            <div className="event-meta-item">
              <span className="meta-label">Venue</span>
              <span className="meta-value">{venue}</span>
            </div>
          )}
          {attire && (
            <div className="event-meta-item">
              <span className="meta-label">Attire</span>
              <span className="meta-value">{attire}</span>
            </div>
          )}
        </div>

        {description && (
          <p className="event-description">{description}</p>
        )}
      </div>
    </article>
  );
};
