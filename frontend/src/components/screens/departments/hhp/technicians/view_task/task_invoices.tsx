import useFetchTicketInvoices from '@/hooks/useFetchTicketInvoices';
import formatCurrency from '@/lib/format_currency';
import moment from 'moment';
import React from 'react'

type TInvoices = {
    ticket_number: string | undefined;
}
const TicketInvoices = ({ ticket_number }: TInvoices) => {
    const { invoicesList, invoicesListLoading, refetch } = useFetchTicketInvoices(ticket_number)

    return (
        <>
            {
                invoicesListLoading ? <p>Loading invoices</p> :

                    <>
                        {
                            invoicesList && invoicesList?.length > 0 ?
                                <>

                                    {invoicesList?.map((x) => (
                                        <div className="rounded-sm border border-[#eee] p-2 mb-2" key={x?.id}>
                                            <h5 className="font-regular text-sm">Invoice number: {x?.number}</h5>
                                            <h5 className="font-regular text-sm">Created: {moment(x?.created_at).format("lll")}</h5>
                                            <h5 className="font-regular text-sm">Updated: {moment(x?.updated_at).format("lll")}</h5>
                                            <h5 className="font-regular text-sm">Total: {formatCurrency(Number(x?.total))}</h5>
                                            <h5 className="font-regular text-sm">Is paid?: {x?.is_paid}</h5>
                                        </div>
                                    ))

                                    }
                                </>
                                : <p>No invoices</p>
                        }


                    </>
            }
        </>
    )
}

export default TicketInvoices