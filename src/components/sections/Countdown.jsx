import React, { useState, useEffect } from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import './Countdown.css';

export const Countdown = () => {
  const { countdown, events } = weddingData;
  const targetEvent = events.find(e => e.id === countdown.targetEventId) || events[0];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!targetEvent?.isoDateTime) return;

    let targetTimestamp = new Date(targetEvent.isoDateTime).getTime();
    const now = new Date().getTime();
    if (targetTimestamp <= now) {
      const currentYear = new Date().getFullYear();
      let nextYear = currentYear;
      let nextTarget = new Date(`${nextYear}-08-14T19:15:00+05:30`).getTime();
      if (nextTarget <= now) {
        nextTarget = new Date(`${nextYear + 1}-08-14T19:15:00+05:30`).getTime();
      }
      targetTimestamp = nextTarget;
    }

    const calculateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const difference = Math.max(0, targetTimestamp - currentTime);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [targetEvent]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <section id="countdown" className="editorial-section countdown-section" aria-label="Wedding Countdown">
      {/* Soft luxury background glow */}
      <div className="countdown-paper-backdrop" aria-hidden="true" />

      <div className="section-container countdown-inner-container text-center">
        
        {/* Eyebrow & Main Heading */}
        <header className="countdown-intro-header">
          <RevealAnimation animation="fade-up">
            <Eyebrow>{countdown.eyebrow}</Eyebrow>
            <h2 className="countdown-main-heading">{countdown.heading}</h2>
            <Divider symbol="star" className="countdown-divider" />
          </RevealAnimation>
        </header>

        {/* 4 Small, Equal-Sized Editorial Countdown Cards in a Staggered Row (100ms apart) */}
        <div className="countdown-wrapper">
          <div className="editorial-countdown-grid" role="timer" aria-live="off">
            {units.map((unit, idx) => (
              <RevealAnimation
                key={unit.label}
                animation="fade-up"
                delay={150 + idx * 100}
                duration={750}
                className="countdown-unit-anim-wrapper"
              >
                <div className="countdown-unit-card">
                  <span className="unit-number">{String(unit.value).padStart(2, '0')}</span>
                  <span className="unit-label">{unit.label}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
