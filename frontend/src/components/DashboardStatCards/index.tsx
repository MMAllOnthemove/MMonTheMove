import { Metric, Text } from "@tremor/react";

type TDashboardStatCards = {
  title: string;
  stat: string | number | any;
  onClick?: () => void;
};
function DashboardStatCards({ title, stat, onClick }: TDashboardStatCards) {
  return (
    <article
      className="flex flex-col justify-between p-5 border border-[#eee] bg-white dark:bg-[#22303C] rounded cursor-pointer"
      onClick={onClick}
    >
      <div className="first_row flex justify-between items-center">
        <div>
          <Text className="text-sm text-gray-400 font-medium dark:text-[#8899a6]">
            {title}
          </Text>
          <Metric className="text-xl lg:text-5xl font-bold text-indigo-500 dark:text[#eee]">
            {stat}
          </Metric>
        </div>
      </div>
    </article>
  );
}

export default DashboardStatCards;
