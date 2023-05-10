import React from "react";
import { analytic } from "../public/_data/analytics";
import { useRouter } from "next/router";


// Dashboard analytics card

function AnalyticCard() {
  const router = useRouter();
  return (
    <>
      {analytic.map((item) => (
        <article
          onClick={() => router.push(`/dashboard/${item.href}`)}
          className="bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center cursor-pointer"
          key={item.id}
        >
          <div className="flex gap-2 flex-col">
            <h2 className="font-sans text-5xl font-semibold text-gray-900">
              {item.stat}
            </h2>
            <p className="font-sans tracking-wide text-xl text-gray-600 uppercase">
              {item.title}
            </p>
          </div>
        </article>
      ))}
    </>
  );
}

export default AnalyticCard;
