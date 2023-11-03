import { IUnitsPendingCard } from "../../../utils/interfaces";

function UnitsPendingCard(props: IUnitsPendingCard) {
  return (
    <article
      onClick={props.onClick}
      className="card max-w-md  cursor-pointer p-6 bg-white  dark:bg-[#22303C] border border-gray-200 rounded-lg  flex flex-col justify-center text-center"
    >
      <p className=" text-slate-700 dark:text-[#8899a6] font-semibold text-md leading-none tracking-tight capitalize">
        {props.cardParagraph}
      </p>
      <h3 className="text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-[#eee] md:text-5xl lg:text-6xl ">
        {props.cardHeading}
      </h3>
    </article>
  );
}

export default UnitsPendingCard;
