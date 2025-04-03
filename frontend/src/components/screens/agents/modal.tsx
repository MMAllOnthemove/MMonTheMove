"use client"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type TAgentsModal = {
    openAddModal: boolean;
    setOpenAddModal: (data: boolean) => void;
    agent_firstname: string;
    setAgentFirstname: (data: string) => void;
    agent_lastname: string;
    setAgentLastname: (data: string) => void;
    errors: {
        agent_firstname?: string;
        agent_lastname?: string;
    }
    addBookingAg: (data: string | any) => void;
    addAgentLoading: boolean;

}
const AgentsModal = ({ openAddModal, setOpenAddModal, agent_firstname, setAgentFirstname, agent_lastname, setAgentLastname, errors, addBookingAg, addAgentLoading }: TAgentsModal) => {
    return (
        <>
            {
                openAddModal && <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
                    {/* <DialogTrigger>Open</DialogTrigger> */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add booking agent</DialogTitle>
                            <DialogDescription>
                                It will auto detect that it is HHP
                            </DialogDescription>
                        </DialogHeader>
                        <form>
                            <div className="space-y-3 mb-3">
                                <Label htmlFor="agent_firstname">Booking agent name</Label>
                                <Input
                                    value={agent_firstname}
                                    onChange={(e) => setAgentFirstname(e.target.value)}
                                    name="email"
                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                />
                                {errors.agent_firstname && <p className="text-sm text-red-500 font-medium">{errors.agent_firstname}</p>}
                            </div>
                            <div className="space-y-3 mb-3">
                                <Label htmlFor="agent_lastname">Booking agent lastname</Label>
                                <Input
                                    value={agent_lastname}
                                    onChange={(e) => setAgentLastname(e.target.value)}
                                    name="email"
                                    className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                                />
                                {errors.agent_lastname && <p className="text-sm text-red-500 font-medium">{errors.agent_lastname}</p>}
                            </div>

                            <Button className="w-full outline-none" type="submit" onClick={addBookingAg} disabled={addAgentLoading}>{addAgentLoading ? 'Creating...' : 'Add agent'}</Button>
                        </form>


                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default AgentsModal