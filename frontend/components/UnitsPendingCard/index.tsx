import React from "react";

interface IUnitsPendingCard {
  cardParagraph: string | number;
  cardHeading: string | number | string[] | number[];
  onClick?: () => void;
}

function UnitsPendingCard(props: IUnitsPendingCard) {
  return (
    <article
      onClick={props.onClick}
      className="card max-w-md  cursor-pointer p-6 bg-white border border-gray-200 rounded-lg  flex flex-col justify-center text-center"
    >
      <p className="font-sans  text-slate-700 font-semibold text-md leading-none tracking-tight capitalize">
        {props.cardParagraph}
      </p>
      <h3 className="font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
        {props.cardHeading}
      </h3>
    </article>
  );
}

export default UnitsPendingCard;
