import { viewDetailsOnHomeTableModalState } from "@/atoms/viewDetailsOnHomeTableAtom";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

interface Props {
  //   children: React.ReactNode;
  id: string | number;
}

export default function ModalManagementDetails({ id }: Props) {
  const [modalState, setModalState] = useRecoilState(
    viewDetailsOnHomeTableModalState
  );
  const [getJobDetails, setGetJobDetails] = useState<any[]>([]);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // let getJobById =
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>View Job</h2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{id}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
