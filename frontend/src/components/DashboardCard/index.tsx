import React from 'react'


type TDashboardCard = {
    title: string,
    paragraph: string | number,
    onClick?: () => void;
}
function DashboardCard({ title, paragraph, onClick }: TDashboardCard) {
    return (

        <article className="rounded-lg pt-2 border-[#eee]" onClick={onClick}>
            <div className="rounded-t-none rounded-md p-8 flex justify-center items-center flex-col shadow">
                <h5 className="mb-2 font-bold tracking-tight text-gray-900">{title}</h5>
                <p className="font-normal text-gray-700 text-2xl">{paragraph}</p>
            </div>

        </article>
    )
}

export default DashboardCard
