import { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import Navbar from "../../../components/Navbar";

function Parts() {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = () => {};

  useEffect(() => {
    async function getData(url = "", data = {}) {
      setLoading(true);
      await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 1c5914b1-9eaf-3aa7-a0d9-cf11c0a72e10",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((data: any) => {
          // console.log(data);
          console.log(data.EtAltm.results);
          setData(data);
          setLoading(false);
        });
    }

    getData("https://eu.ipaas.samsung.com/eu/gcic/GetPartsInfo/1.0/ImportSet", {
      "IsCommonHeader": {
        "Company": "C720",
        "AscCode": "1730640",
        "Lang": "EN",
        "Country": "ZA",
        "Pac": "999999920180502152320",
      },
      "IvPartsNo": "DA47-00095E",
    });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto p-4">
          <section className="my-4 flex justify-center items-center gap-2">
            <h2></h2>
            <form>
              <input
                className="searchInput input placeholder-sky-900 outline-none text-gray-950"
                placeholder="Search here"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <button
              className="bg-sky-700 py-3 px-4 rounded text-white border border-sky-700 font-sans font-medium hover:bg-sky-950"
              onClick={handleSubmit}
            >
              Search{" "}
            </button>
          </section>

          <section className="my-5">
            {data.EtAltm.results.map(
              (item:any, index:any) => (
                <article
                  className="bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center"
                  key={index}
                >
                  <span className="flex justify-between items-center">
                    <h2>Description</h2> <p>{item.Description}</p>{" "}
                  </span>
                  <span className="flex justify-between items-center">
                    <h2>Color</h2> <p>{item.Color}</p>{" "}
                  </span>
                  <span className="flex justify-between items-center">
                    <h2>PartCode</h2> <p>{item.PartCode}</p>{" "}
                  </span>
                  <span className="flex justify-between items-center">
                    <h2>Prime</h2> <p>{item.Prime}</p>{" "}
                  </span>
                  <span className="flex justify-between items-center">
                    <h2>SalesStatus</h2> <p>{item.SalesStatus}</p>{" "}
                  </span>
                  <span className="flex justify-between items-center">
                    <h2>StockAvalability</h2> <p>{item.StockAvalability}</p>{" "}
                  </span>
                  <span className="flex justify-between items-center">
                    <h2>UnitPrice</h2> <p>{item.UnitPrice}</p>{" "}
                  </span>
                </article>
              )
            )}
          </section>
         
        </div>
      </main>
    </>
  );
}

export default Parts;
