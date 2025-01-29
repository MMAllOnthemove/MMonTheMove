
"use client"
import React from 'react'
import { Tldraw } from 'tldraw';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

type TDrawScratchesModal ={
    openModal: boolean;
    setOpenModal: (data: boolean) => void;
}
const DrawScratchesModal = ({ openModal, setOpenModal }: TDrawScratchesModal) => {
  return (
      <Dialog open={openModal} onOpenChange={() => setOpenModal(false)} >
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Add image and circle scratches</DialogTitle>
                  <DialogDescription>

                  </DialogDescription>
              </DialogHeader>
              <div className="tldraw__editor h-[400px]" style={{ position: 'fixed', inset: 0 }}>
                  <Tldraw persistenceKey="example" />
              </div>

          </DialogContent>
      </Dialog>
  )
}

export default DrawScratchesModal