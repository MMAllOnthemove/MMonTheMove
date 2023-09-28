import Link from "next/link";
import { useState } from "react";
import { navitems } from "../../public/_data/navbar";
import logo from "../../public/mmlogo.png";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  return (
    <>
      <nav className="navbar flex justify-between items-center">
        <button
          role="button"
          id="burger_menu"
          className="burger_menu"
          onClick={ToggleSidebar}
        >
          <svg
            className="burger_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>
        <Link
          className="logo overflow-hidden flex justify-center items-center flex-col p-1"
          href="/"
        >
          <Image
            src={logo}
            alt="allelectronics logo"
            width={50}
            height={40}
            priority={true}
            placeholder="blur"
          />
        </Link>
      </nav>
      <aside className={`sidebar ${isOpen === true ? "active" : ""}`}>
        <div className="sd-header">
          <Link className="logo" href="/">
            <span className="sr-only">Logo</span>
            <svg
              id="logo-15"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
            </svg>
          </Link>
          <button
            role="button"
            id="close_button"
            className="btn close_button"
            onClick={ToggleSidebar}
            aria-label="close button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
        </div>
        <div className="sd-body">
          <ul>
            {navitems.map((item) => (
              <li key={item?.id}>
                <Link href={item?.pageRoute} className={`sd-link`}>
                  {item?.item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div
        className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
        onClick={ToggleSidebar}
      ></div>
    </>
  );
}

export default Navbar;
