import { managementModalState } from "@/atoms/managementModalAtom";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

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
            <h2 className="font-sans text-slate-800">
              Fields will auto populate
            </h2>
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