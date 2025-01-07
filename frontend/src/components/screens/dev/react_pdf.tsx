"use client"
import jsPDF from 'jspdf';

// import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

const ReactPDFScreen = () => {
    const handleDownloadPdf = () => {
        if (typeof window !== 'undefined') {
            const doc = new jsPDF();
            doc.setFontSize(14);
            const pageWidth =
                doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

            doc.text('Samsung Customer Care Pre-Registration Form', pageWidth / 2, 15, {
                align: "center",
            });
            doc.setFontSize(10);
            doc.text('MM ALL ELECTRONICS 0113268337', pageWidth / 2, 20, {
                align: "center",
            });

            // caption

            doc.setFontSize(8);
            doc.text('Details of person booking device in', pageWidth / 2, 25, {
                align: "center",
            });
            autoTable(doc, {
                html: '#my-table',
                tableWidth: 'auto',
                margin: { top: 10 },
                startY: 30,
                styles: { cellPadding: 0.5, fontSize: 10 },
            })
            doc.setFontSize(8);
            doc.text('Details of owner of user or device... (if different from above)', pageWidth / 2, 60, {
                align: "center",
            });
            autoTable(doc, {
                html: '#my-table2',
                tableWidth: 'auto',
                margin: { top: 10 },
                startY: 65,
                styles: { cellPadding: 0.5, fontSize: 10 },
            })
            doc.save('example.pdf');
        }
    };
    return (
        <>
            <div>
                <button onClick={handleDownloadPdf}>Download PDF</button>
                <table
                    id="my-table"
                    className="w-full text-sm text-left text-gray-500 border-collapse table-fixed border"

                >
                    <caption>Monthly savings</caption>
                    <colgroup>
                        <col className="w-1/2" />
                        <col className="w-1/2" />
                    </colgroup>
                    <tbody>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Date
                            </th>
                            <td className="px-4 py-2">Jillllllllllllllllllllllllllllllllllllllllllll</td>
                        </tr>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Name and surname
                            </th>
                            <td className="px-4 py-2">Smith</td>
                        </tr>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Physical address
                            </th>
                            <td className="px-4 py-2">50</td>
                        </tr>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Phone number
                            </th>
                            <td className="px-4 py-2">50</td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Email
                            </th>
                            <td className="px-4 py-2">50</td>
                        </tr>
                    </tbody>
                </table>
                <table
                    id="my-table2"
                    className="w-full text-sm text-left text-gray-500 border-collapse table-fixed border"
                >
                    <caption>Monthly savings</caption>
                    <colgroup>
                        <col className="w-1/2" />
                        <col className="w-1/2" />
                    </colgroup>
                    <tbody>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Date
                            </th>
                            <td className="px-4 py-2">Jillllllllllllllllllllllllllllllllllllllllllll</td>
                        </tr>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Name and surname
                            </th>
                            <td className="px-4 py-2">Smith</td>
                        </tr>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Physical address
                            </th>
                            <td className="px-4 py-2">50</td>
                        </tr>
                        <tr className="border">
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Phone number
                            </th>
                            <td className="px-4 py-2">50</td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                Email
                            </th>
                            <td className="px-4 py-2">50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default ReactPDFScreen