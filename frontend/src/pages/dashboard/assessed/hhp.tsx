import Navbar from "../../../../components/Navbar";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Listbox } from "@headlessui/react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
function Hhp() {
  const [initial, setInitial] = useState(data);
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  useEffect(() => {
    setInitial(initial);
  }, [initial]);
  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto p-2">
          <section className="my-5 flex justify-center items center">
            <h1>Units assessed</h1>
            <Listbox value={selectedPerson} onChange={setSelectedPerson}>
              <Listbox.Button>{selectedPerson.name}</Listbox.Button>
              <Listbox.Options>
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    disabled={person.unavailable}
                  >
                    {person.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </section>

          <div className="stats_cards_row">
            <article className=" h-100 p-2 w-100">
              <LineChart width={400} height={300} className="chart" data={initial}>
                
                <YAxis
                  label={{
                    value: "pv of page",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </article>
            <article className=" h-100 p-2 w-100">
              <LineChart width={400} height={300} className="chart" data={initial}>
                <XAxis dataKey="name">
                  <Label
                    value="Pages of my website"
                    offset={0}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis
                  label={{
                    value: "pv of page",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </article>
           
          </div>
        </div>
      </main>
    </>
  );
}

export default Hhp;
