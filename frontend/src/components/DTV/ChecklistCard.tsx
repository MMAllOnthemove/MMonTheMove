type TCard = {
  heading: string;
  subHeading: string;
};
export default function ChecklistCard({ heading, subHeading }: TCard) {
  return (
    <article className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {heading}
      </h5>
      <p className="text-sky-800 font-semibold">{subHeading}</p>
    </article>
  );
}
