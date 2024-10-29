import React from "react";

interface ITableBody {
    children: React.ReactNode;
}
const TableBody = ({ children }: ITableBody) => {
    return <tbody className="z-0">{children}</tbody>;
};

export default TableBody;
