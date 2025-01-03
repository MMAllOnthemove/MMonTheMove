
"use client"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

type TAttachmentsModal = {
    openModal: boolean;
    ticketFilesUploading: boolean;
    setOpenModal: (data: boolean) => void;
    handleTicketFiles: (data: any) => void;
    sendTicketAttachments: (data: any) => void;
}
const AttachmentsModal = ({ openModal, setOpenModal, ticketFilesUploading, handleTicketFiles, sendTicketAttachments }: TAttachmentsModal) => {
    return (
        <Dialog open={openModal} onOpenChange={() => setOpenModal(false)} >
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add ticket attachments</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                    <Input type="file" multiple accept="image/*,video/*, application/pdf" className="my-3" onChange={handleTicketFiles} />
                    <Button className="ml-3" disabled={ticketFilesUploading} onClick={sendTicketAttachments}>{ticketFilesUploading ? 'Uploading' : 'Attach'}</Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AttachmentsModal