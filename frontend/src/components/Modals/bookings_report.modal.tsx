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

// Custom imports
import { bookingsReportModalState } from "@/atoms/bookingsReport";
import { bookingAgentMapOverJobs } from "../Reports";
import { IBookingAgentsJobDataModal } from "../../../utils/interfaces";

const ModalManagement = ({
  getBookingAgentJobsData,
  dateFrom,
  dateTo,
}: IBookingAgentsJobDataModal) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useRecoilState(bookingsReportModalState);

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
            {modalState.view === "shanes300123" && (
              <h2 className=" text-slate-800">Shane</h2>
            )}
            {modalState.view === "nigelc01" && (
              <h2 className=" text-slate-800">Nigel</h2>
            )}
            {modalState.view === "sherryl060223" && (
              <h2 className=" text-slate-800">Sherry</h2>
            )}
            {modalState.view === "lavonaj01" && (
              <h2 className=" text-slate-800">Lavona</h2>
            )}
          </ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody>{props.children}</ModalBody> */}
          <ModalBody>
            {/* Filter by booking agent using the custom filter function we imported */}
            <div className="max-h-[540px] overflow-y-auto">
              {modalState.view === "shanes300123" &&
                bookingAgentMapOverJobs(
                  getBookingAgentJobsData,
                  dateFrom,
                  dateTo,
                  "shanes300123"
                )}
              {modalState.view === "nigelc01" &&
                bookingAgentMapOverJobs(
                  getBookingAgentJobsData,
                  dateFrom,
                  dateTo,
                  "nigelc01"
                )}
              {modalState.view === "sherryl060223" &&
                bookingAgentMapOverJobs(
                  getBookingAgentJobsData,
                  dateFrom,
                  dateTo,
                  "sherryl060223"
                )}
              {modalState.view === "lavonaj01" &&
                bookingAgentMapOverJobs(
                  getBookingAgentJobsData,
                  dateFrom,
                  dateTo,
                  "lavonaj01"
                )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalManagement;
