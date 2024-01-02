// External imports
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
import { dtvAddTaskModalState } from "@/atoms/dtv-add-task-modal-atom";
interface Props {
  children: React.ReactNode;
}

const ModalDtv = ({ children }: Props) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useRecoilState(dtvAddTaskModalState);

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
            <h2 className="text-slate-800">Fields will auto populate</h2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          {/* <ModalFooter>
              <button
                type="button"
                className="bg-green-900 text-white font-semibold  rounded py-3 px-2 my-2"
                onClick={handleClose}
              >
                Close
              </button>
            </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDtv;
