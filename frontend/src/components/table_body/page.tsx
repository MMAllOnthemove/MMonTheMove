import React from "react";

interface ITableBody {
    children: React.ReactNode;
}
const TableBody = ({ children }: ITableBody) => {
    return <tbody className="z-0">{children}</tbody>;
};
//  (e) => handleUpdate(e, row.original.id)
export default TableBody;
