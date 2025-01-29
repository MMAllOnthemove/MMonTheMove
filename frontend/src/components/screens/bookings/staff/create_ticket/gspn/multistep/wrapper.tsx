import React from 'react'

import { ReactNode } from "react"

type FormWrapperProps = {
    title: string
    children: ReactNode
}


function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <>
            <h2 className='mb-[2em] text-lg font-semibold leading-none tracking-tight text-center'>
                {title}
            </h2>
            <div
            >
                {children}
            </div>
        </>
    )
}

export default FormWrapper
