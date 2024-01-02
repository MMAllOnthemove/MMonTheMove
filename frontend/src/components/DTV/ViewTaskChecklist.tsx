import React, { useEffect, useState } from "react";
import ChecklistCard from "./ChecklistCard";

type TViewTaskChecklist = {
  pageid: string | string[] | undefined;
};

function ViewTaskChecklist({ pageid }: TViewTaskChecklist) {
  const [getChecklistData, setChecklistData] = useState<string[] | any>([]);
  const [getFilteredChecklistData, setFilteredChecklistData] = useState<
    string[] | any
  >([]);

  useEffect(() => {
    fetchCheckistForThisJob();
  }, []);

  async function fetchCheckistForThisJob() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}checklist/get`, {
        method: "GET",
        cache: "default",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log("data", data);
          let filteredData = [...data]
            .map((x) => x)
            .filter((x) => x.id === pageid);
          //   console.log("filteredData", filteredData);
          setChecklistData(data);
          setFilteredChecklistData(filteredData);
          return data;
        });
    } catch (error) {
      // console.log(error);
    }
  }
  return (
    <section>
      <h2 className="my-2 text-slate-800 font-semibold">Task Checklist</h2>
      {getFilteredChecklistData.map((x: string | any) => (
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
