import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { managementModalState } from "@/atoms/managementModalAtom";

interface Props {
  children: React.ReactNode;
}

function ModalManagement(props: Props) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useRecoilState(managementModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === "management" && "Fields will auto populate"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.children}</ModalBody>

          {/* <ModalFooter>
            <button
              type="button"
              className="bg-green-900 text-white font-semibold font-sans rounded py-3 px-2 my-2"
              onClick={handleClose}
            >
              Close
            </button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalManagement;
