import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

function Parts() {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string | any>("");

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
          setData(data);
          setLoading(false);
        });
    }

    getData("https://eu.ipaas.samsung.com/eu/gcic/GetPartsInfo/1.0/ImportSet", {
      IsCommonHeader: {
        Company: "C720",
        AscCode: "1730640",
        Lang: "EN",
        Country: "ZA",
        Pac: "999999920180502152320",
      },
      IvPartsNo: search,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

const PartInfo = (props:any)=>
props.list.map((item:any) => (
  <span key={item.Description}>
    <p>{item.ASCPrice}</p>
    <p>{item.Color}</p>
    <p>{item.CoreAPrice}</p>
    <p>{item.CoreBPrice}</p>
    <p>{item.Currency}</p>
    <p>{item.Division}</p>
    <p>{item.DivisionDesc}</p>
    <p>{item.DivisionName}</p>
    <p>{item.PartsDescription}</p>
    <p>{item.PartsNo}</p>
    <p>{item.RetailPrice}</p>
    <p>{item.SalesStatus}</p>
    <p>{item.StockAvalability}</p>
    <p>{item.UnitPrice}</p>
  </span>
))
const handleSearch = (event: any) => {
  setSearch(event.target.value);
};
const filterPartInfo = Object.values(data.Return).filter((part: any) => {
  return (
    part.Description.includes(search)
  );
});
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
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </form>

            <button className="bg-sky-700 py-3 px-4 rounded text-white border border-sky-700 font-sans font-medium hover:bg-sky-950" value={search} onChange={handleSearch}>
              Search{" "}
            </button>
          </section>

          {/* {Object.values(data.Return).map((item: any) => (
            <span key={item.Description}>
              <p>{item.ASCPrice}</p>
              <p>{item.Color}</p>
              <p>{item.CoreAPrice}</p>
              <p>{item.CoreBPrice}</p>
              <p>{item.Currency}</p>
              <p>{item.Division}</p>
              <p>{item.DivisionDesc}</p>
              <p>{item.DivisionName}</p>
              <p>{item.PartsDescription}</p>
              <p>{item.PartsNo}</p>
              <p>{item.RetailPrice}</p>
              <p>{item.SalesStatus}</p>
              <p>{item.StockAvalability}</p>
              <p>{item.UnitPrice}</p>
            </span>
          ))} */}
              <PartInfo list={filterPartInfo} />
        </div>
      </main>
    </>
  );
}

export default Parts;
