import React, { useEffect, useState } from "react";
import ChecklistCard from "./ChecklistCard";
import { fetchSingleDTVChecklist } from "@/hooks/useFetch";

type TViewTaskChecklist = {
  id: string | string[] | undefined;
};

function ViewTaskChecklist({ id }: TViewTaskChecklist) {
  const { dtvSingleChecklist } = fetchSingleDTVChecklist();
  const filterChecklistByJobId = [...dtvSingleChecklist].filter(
    (x) => x.id === id
  );
  return (
    <section>
      <h2 className="my-2 text-slate-800 font-semibold">Task Checklist</h2>
      {filterChecklistByJobId.map((x: string | any) => (
        <div key={x.checklist_id}>
          <div className="p-5 border rounded border-[#eee]">
            <p className="text-slate-800 font-normal">
              Car: <span className="text-sky-900 font-semibold">{x?.car}</span>
            </p>
            <p className="text-slate-800 font-normal">
              Created by:{" "}
              <span className="text-sky-900 font-semibold">
                {x?.checklist_created_by}
              </span>
            </p>
            <p className="text-slate-800 font-normal">
              Date:{" "}
              <span className="text-sky-900 font-semibold">
                {new Date(x?.date_added).toDateString()}
              </span>
            </p>
          </div>
          <h2 className="my-2 text-slate-800 font-semibold">Specifications</h2>

          <div className="checklist_cards">
            {" "}
            <ChecklistCard heading="Odometer" subHeading={x?.car_odometer} />
            <ChecklistCard heading="Driver" subHeading={x?.car_driver} />
            <ChecklistCard
              heading="Car jack"
              subHeading={
                x?.car_jack_check === true ? "Checked" : "Not Checked"
              }
            />
            <ChecklistCard
              heading="Car spare wheel"
              subHeading={
                x?.car_spare_wheel_check === true ? "Checked" : "Not Checked"
              }
            />
            <ChecklistCard
              heading="Car triangle"
              subHeading={
                x?.car_triangle_check === true ? "Checked" : "Not Checked"
              }
            />
            <ChecklistCard
              heading="Car oil"
              subHeading={x?.car_oil_check === true ? "Checked" : "Not Checked"}
            />
            <ChecklistCard
              heading="Car water"
              subHeading={
                x?.car_water_check === true ? "Checked" : "Not Checked"
              }
            />
            <ChecklistCard
              heading="Car pressure"
              subHeading={
                x?.car_tire_pressure_check === true ? "Checked" : "Not Checked"
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default ViewTaskChecklist;
