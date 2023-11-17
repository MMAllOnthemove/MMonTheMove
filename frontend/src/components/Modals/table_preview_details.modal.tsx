// External imports
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

// Custom imports
import { viewDetailsOnHomeTableModalState } from "@/atoms/viewDetailsOnHomeTableAtom";

interface Props {
  //   children: React.ReactNode;
  id: string | number;
}

const ModalManagementDetails = ({ id }: Props) => {
  const [modalState, setModalState] = useRecoilState(
    viewDetailsOnHomeTableModalState
  );

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
            <h2>View Job</h2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{id}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalManagementDetails;
