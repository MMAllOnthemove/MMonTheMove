import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

function Parts() {
  const [data, setData] = useState<null | any>(null);
  const [Description, setDescription] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

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
          // console.log(data.Return.EsPartsInfo.PartsDescription);
          // console.log(Object.values(data.Return.EsPartsInfo));
          console.log(Object.values(data.Return.EsPartsInfo));
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
  }, [search]);
  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;

  const PartInfoList = (props: any) =>
    props.list.map((part: any, index: any) => {
      const {
        PartsNo,
        Division,
        DivisionDesc,
        PartsDescription,
        SalesStatus,
        StockAvalability,
        UnitPrice,
        Currency,
        Color,
        DivisionName,
        RetailPrice,
        ASCPrice,
        CoreAPrice,
        CoreBPrice,
      } = part;

      return (
        <tr key={index}>
          <td>{PartsNo}</td>
          <td>{Division}</td>
          <td>{DivisionDesc}</td>
          <td>{PartsDescription}</td>
          <td>{SalesStatus}</td>
          <td>{StockAvalability}</td>
          <td>{UnitPrice}</td>
          <td>{Currency}</td>
          <td>{Color}</td>
          <td>{DivisionName}</td>
          <td>{RetailPrice}</td>
          <td>{ASCPrice}</td>
          <td>{CoreAPrice}</td>
          <td>{CoreBPrice}</td>
        </tr>
      );
    });
    const handleSubmit = (e:any)=>{
      e.preventDefault(); 
      setSearch(search);
      console.log("It works", search);
      
    }
    const handleSearch = (event: any) => {
      setSearch(event.target.value);
    };
  
    const filterPartInfo:any[] = Object.values(data?.EsPartsInfo).filter((course:any) => {
      return (
        course.PartsNo.toLowerCase().includes(search.toLowerCase())
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
                onChange={handleSearch}
              />
            </form>

            <input type="submit" value="Search" onClick={handleSubmit}
              className="bg-sky-700 py-3 px-4 rounded text-white border border-sky-700 font-sans font-medium hover:bg-sky-950"
            />
            
          </section>

        <section>
        <PartInfoList list={filterPartInfo} />
        </section>
        </div>
      </main>
   </>
  );
}

export default Parts;
