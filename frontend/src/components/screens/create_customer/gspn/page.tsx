"use client"
import React, { useState } from 'react'

const CreateGSPNCustomerScreen = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [businessname, setBusinessName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address_2, setAddress_2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    return (
        <div>CreateGSPNCustomerScreen</div>
    )
}

export default CreateGSPNCustomerScreen