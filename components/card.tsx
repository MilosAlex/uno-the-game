import React from "react";

interface CardProps {
  color: string;
  value: string;
}

export default function Card(props: CardProps) {
  const colorClass = `card--${props.color}`;
  return (
    <article className={`card ${colorClass}`}>
      <div className="card__content">
        <span className="card__number-top">{props.value}</span>
        <div className="card__ellipse"/>
        <span className="card__number-middle">{props.value}</span>
        <span className="card__number-bottom">{props.value}</span>
      </div>
    </article>
  );
}
