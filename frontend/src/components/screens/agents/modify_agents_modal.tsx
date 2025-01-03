"use client"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import React from 'react'
type TModifyAgentsModal = {
    modifyAgentModal: boolean;
    agent_firstname: string
    setModifyAgentModal: (data: boolean | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    deleteBookingAg: (data: string | any) => void;
    deleteAgentLoading: boolean;
}
const ModifyAgentsModal = ({ modifyAgentModal, agent_firstname, setModifyAgentModal, deleteBookingAg, deleteAgentLoading }: TModifyAgentsModal) => {
    return (
        <>

            {
                modifyAgentModal && <Dialog open={modifyAgentModal} onOpenChange={setModifyAgentModal} >
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete booking agent</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete <strong>{agent_firstname}</strong>?
                            </DialogDescription>
                        </DialogHeader>


                        <div className="grid items-center grid-cols-2 gap-3">
                            <Button className="outline-none" type="button" onClick={setModifyAgentModal}>No, cancel</Button>
                            <Button className="outline-none bg-red-600 hover:bg-red-500 focus:bg-red-500" type="button" onClick={deleteBookingAg} disabled={deleteAgentLoading}>{deleteAgentLoading ? 'Deleting...' : 'Yes, delete'}</Button>

                        </div>

                    </DialogContent>
                </Dialog>
            }

        </>
    )
}

export default ModifyAgentsModal