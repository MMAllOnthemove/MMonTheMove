import { homepageModalState } from "@/atoms/homepageModalAtom";
import { AccountContext } from "@/state/AccountContext";
import Head from "next/head";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ModalHomepage from "../../components/Modals/modal.home";
import Navbar from "../../components/Navbar";
import { socket as socketConn } from "../../components/socket"; // Had to rename to socketConn because we already have socket initialized in this page
import useDebounce from "../../components/useDebounce";
import { homeImages } from "../../public/_data/homeImages";

export const SocketContext = createContext<any>(null);

function Home() {
  const [data, setData] = useState<null | any>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  // Global state for the modal
  const setHomeModalState = useSetRecoilState(homepageModalState);

  // Context to check if user is already logged in
  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => {
    socketConn(user);
  });

  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);

  // console.log(user);
  // Connects to socket io and logs user out if there is an error on our backend
  // useSocketSetup();

  // debounced search debounces the search query
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    const getData = async (url = "", data = {}) => {
      // setLoading(true);
      await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((data: string | any) => {
          setData(data);
          // console.log(data);

          // setLoading(false);
        });
    };

    if (debouncedSearch)
      getData(
        "https://eu.ipaas.samsung.com/eu/gcic/GetSOInfoAll/1.0/ImportSet",
        {
          IvSvcOrderNo: debouncedSearch,
          // IvSvcOrderNo: "4266810380",
          // IvAscJobNo: "4266443508",
          IsCommonHeader: {
            Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
            AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
            Lang: `${process.env.NEXT_PUBLIC_LANG}`,
            Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
            Pac: `${process.env.NEXT_PUBLIC_PAC}`,
          },
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <>
      <Head>
        <title>HHP - Home</title>
      </Head>
      <header className="bg-white absolute inset-x-0 top-0 z-50">
        <Navbar />
      </header>

      <SocketContext.Provider value={{ socket }}>
        <main className="home_main flex flex-col justify-center">
          <div className="mx-auto p-1 sm:p-0.5 container">
            <div className="content-wrapper">
              <h1>
                HHP <span>Management</span>{" "}
              </h1>
              <button
                type="button"
                onClick={() => {
                  setHomeModalState({
                    open: true,
                    view: "/",
                  });
                }}
              >
                Get service order
              </button>
              <section>
                <div className="home_image_grid">
                  {homeImages.map((item) => (
                    <Image
                      key={item.id}
                      placeholder="blur"
                      loading="lazy"
                      quality={100}
                      src={item.src}
                      alt={`${item.src}`}
                    />
                  ))}
                </div>
              </section>
            </div>

            <ModalHomepage>
              <label htmlFor="ServiceOrder" className="sr-only">
                Service Order No
              </label>
              <input
                autoFocus
                aria-labelledby="ServiceOrder"
                type="text"
                name="ServiceOrder"
                placeholder="Get random service order information"
                id="ServiceOrder"
                className="outline-none border-sky-600 py-2 px-2 border rounded-sm my-2 w-full"
                value={debouncedSearch}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />

              <section className="homepage_modal_content">
                <p className="text-[#0d0d0d] font-inherit font-medium py-2">
                  Accessory:{" "}
                  <span>
                    {data?.Return?.EsModelInfo.Accessory === ""
                      ? "Not available"
                      : data?.Return?.EsModel}
                  </span>{" "}
                </p>
                <p className="text-[#0d0d0d] font-inherit font-semibold py-2">
                  IMEI:{" "}
                  <span className="text-[#075985] font-medium">
                    {data?.Return?.EsModelInfo.IMEI === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.IMEI}
                  </span>
                </p>
                <p className="text-[#0d0d0d] font-inherit font-semibold py-2">
                  Model:{" "}
                  <span className="text-[#075985] font-medium">
                    {data?.Return?.EsModelInfo.Model === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.Model}
                  </span>
                </p>
                <p className="text-[#0d0d0d] font-inherit font-semibold py-2">
                  Serial Number:{" "}
                  <span className="text-[#075985] font-medium">
                    {data?.Return?.EsModelInfo.SerialNo === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.SerialNo}
                  </span>
                </p>
                <p className="text-[#0d0d0d] font-inherit font-medium py-2">
                  Issue:{" "}
                  <span className="text-[#075985] font-medium">
                    {data?.Return?.EsModelInfo.DefectDesc === ""
                      ? "Not available"
                      : data?.Return?.EsModelInfo.DefectDesc}
                  </span>
                </p>
                <p className="text-[#0d0d0d] font-inherit font-semibold py-2">
                  Warranty:{" "}
                  <span className="text-[#075985] font-medium">
                    {data?.Return?.EsModelInfo.WtyType === "LP"
                      ? "IW"
                      : data?.Return?.EsModelInfo.WtyType}
                  </span>
                </p>
              </section>
            </ModalHomepage>
          </div>
        </main>
      </SocketContext.Provider>
    </>
  );
}

export default Home;
