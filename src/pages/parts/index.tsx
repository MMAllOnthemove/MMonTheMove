import { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import Navbar from "../../../components/Navbar";

function Parts() {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = ()=>{

  }

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
        .then((data:any) => {
          // console.log(data);
          // console.log(data.EtAltm.results);
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
      IvPartsNo: "BN95-07618A",
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
            <InputField
              className="searchInput input placeholder-sky-900 outline-none text-gray-950"
              name="search"
              type="text"
              placeholder="Search here"
              
            />
            <button className="bg-sky-700 py-3 px-4 rounded text-white border border-sky-700 font-sans font-medium" onClick={handleSubmit}>Search </button>
          </section>
{/* 
          <section>
            {data.EtAltm.results.map((item: any) => (
              <>
                <section className="partsDetailCardRows" key={item.Description}>
                  <article  className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center justify-center'>
                    <h5>
                      Color
                    </h5>
                    <p>{item.Color}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 14c-.092.064-2 2.083-2 3.5 0 1.494.949 2.448 2 2.5.906.044 2-.891 2-2.5 0-1.5-1.908-3.436-2-3.5zM9.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586l7-7-.707-.707L11 4.586 8.707 2.293 7.293 3.707 9.586 6 4 11.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414L9.586 20zM11 7.414 16.586 13H5.414L11 7.414z"></path></svg>

                  </article>
                  <article  className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center'>
                    <h5>
                      Description 
                    </h5>
                    <p>{item.Description}</p>
                  </article>
                  <article  className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center'>
                    <h5>
                      PartCode 
                    </h5>
                    <p>{item.PartCode}</p>
                  </article>
                  <article className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center'>
                    <h5>
                      Prime 
                    </h5>
                    <p>{item.Prime}</p>
                  </article>
                  <article className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center'>
                    <h5>
                      SalesStatus 
                    </h5>
                    <p>{item.SalesStatus}</p>
                  </article>
                  <article  className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center'>
                    <h5>
                      StockAvalability
                    </h5>
                    <p>{item.StockAvalability}</p>
                  </article>
                  <article  className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center'>
                    <h5>
                      UnitPrice 
                    </h5>
                    <p>{item.UnitPrice}</p>
                  </article>
                </section>
              </>
            ))}
          </section> */}
        </div>
      </main>
    </>
  );
}

export default Parts;
