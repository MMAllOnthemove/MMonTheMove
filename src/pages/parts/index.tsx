import { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import Navbar from "../../../components/Navbar";

function Parts() {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);

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
      IvPartsNo: "DA32-00011E",
    });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;


  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto">
          <section className="my-4">
            <h2></h2>
            <InputField
              className="searchInput input"
              name="search"
              type="search"
              placeholder="Search here"
            />
          </section>

          <section>
            {data.EtAltm.results.map((item: any, index:any) => (
              <>
                <section className="partsDetailCardRows" key={index}>
                  <article  className='bg-white border-t-4 border-sky-600 p-8 shadow-md rounded grid text-center'>
                    <h5>
                      Color
                    </h5>
                    <p>{item.Color}</p>
             

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
          </section>
        </div>
      </main>
    </>
  );
}

export default Parts;
