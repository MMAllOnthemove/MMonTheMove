import { unitsPendingReportModalState } from "@/atoms/unitspendingAtom";
import {
  getMappedBookedInJobs,
  getMappedJobsByStatusCount,
} from "@/functions/pendingUnitsFunc";
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
  children?: React.ReactNode;
  fetchAlldata: string[] | any;
  fetchJobsApprovedAndRejected: string[] | any;
  dateFrom: string | any;
  dateTo: string | any;
}

function ModalManagement({
  fetchAlldata,
  fetchJobsApprovedAndRejected,
  dateFrom,
  dateTo,
}: Props) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useRecoilState(
    unitsPendingReportModalState
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
            {modalState.view === "assigned-to-tech" && (
              <h2 className=" text-slate-800">Assigned to tech</h2>
            )}
            {modalState.view === "booked-in" && (
              <h2 className=" text-slate-800">Booked in</h2>
            )}
            {modalState.view === "customer-reply" && (
              <h2 className=" text-slate-800">Customer reply</h2>
            )}
            {modalState.view === "first-approval" && (
              <h2 className=" text-slate-800">Parts request 1st approval</h2>
            )}
            {modalState.view === "for-invoicing" && (
              <h2 className=" text-slate-800">For invoicing</h2>
            )}
            {modalState.view === "parts-dna" && (
              <h2 className=" text-slate-800">Parts DNA</h2>
            )}
            {modalState.view === "parts-issued" && (
              <h2 className=" text-slate-800">Parts issued</h2>
            )}
            {modalState.view === "parts-to-be-ordered" && (
              <h2 className=" text-slate-800">Parts to be ordered</h2>
            )}
            {modalState.view === "pending-q-and-a" && (
              <h2 className=" text-slate-800">Pending Q&A</h2>
            )}
            {modalState.view === "qc-completed" && (
              <h2 className=" text-slate-800">QC Completed</h2>
            )}
            {modalState.view === "qc-failed" && (
              <h2 className=" text-slate-800">QC Failed</h2>
            )}
            {modalState.view === "quality-control" && (
              <h2 className=" text-slate-800">Quality Control</h2>
            )}
            {modalState.view === "quote-approved" && (
              <h2 className=" text-slate-800">Quote approved</h2>
            )}
            {modalState.view === "quote-pending" && (
              <h2 className=" text-slate-800">Quote pending</h2>
            )}
            {modalState.view === "quote-rejected" && (
              <h2 className=" text-slate-800">Quote rejected</h2>
            )}
            {modalState.view === "repair-complete" && (
              <h2 className=" text-slate-800">Repair complete</h2>
            )}
            {modalState.view === "repair-in-progress" && (
              <h2 className=" text-slate-800">Repair in progress</h2>
            )}
            {modalState.view === "scheduled" && (
              <h2 className=" text-slate-800">Scheduled</h2>
            )}
            {modalState.view === "scrap-approved" && (
              <h2 className=" text-slate-800">Scrap approved</h2>
            )}
            {modalState.view === "so-cancel" && (
              <h2 className=" text-slate-800">SO cancel</h2>
            )}
            {modalState.view === "waiting-for-customer" && (
              <h2 className=" text-slate-800">Waiting for customer</h2>
            )}
            {modalState.view === "waiting-for-parts" && (
              <h2 className=" text-slate-800">Waiting for parts</h2>
            )}
            {modalState.view === "waiting-saw" && (
              <h2 className=" text-slate-800">Waiting SAW</h2>
            )}
          </ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody>{props.children}</ModalBody> */}
          <ModalBody>
            {/* Filter by booking agent using the custom filter function we imported */}
            <div className="max-h-[540px] overflow-y-auto">
              {modalState.view === "assigned-to-tech" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Assigned to tech"
                )}
              {modalState.view === "booked-in" &&
                getMappedBookedInJobs(fetchAlldata, dateFrom, dateTo)}
              {modalState.view === "customer-reply" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Customer reply"
                )}
              {modalState.view === "first-approval" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Parts request 1st approval"
                )}
              {modalState.view === "for-invoicing" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "For invoicing"
                )}
              {modalState.view === "parts-dna" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Parts DNA"
                )}
              {modalState.view === "parts-issued" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Parts issued"
                )}
              {modalState.view === "parts-to-be-ordered" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Parts to be ordered"
                )}
              {modalState.view === "pending-q-and-a" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Pending Q&A"
                )}
              {modalState.view === "qc-completed" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "QC completed"
                )}
              {modalState.view === "qc-failed" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "QC failed"
                )}
              {modalState.view === "quality-control" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Quality Control (QC)"
                )}
              {modalState.view === "quote-approved" &&
                getMappedJobsByStatusCount(
                  fetchJobsApprovedAndRejected,
                  dateFrom,
                  dateTo,
                  "Quote approved"
                )}
              {modalState.view === "quote-pending" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Quote pending"
                )}
              {modalState.view === "quote-rejected" &&
                getMappedJobsByStatusCount(
                  fetchJobsApprovedAndRejected,
                  dateFrom,
                  dateTo,
                  "Quote rejected"
                )}
              {modalState.view === "repair-in-progress" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Repair in progress"
                )}
              {modalState.view === "scheduled" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Scheduled"
                )}
              {modalState.view === "scrap-approved" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Scrap approved"
                )}
              {modalState.view === "so-cancel" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "SO cancel"
                )}
              {modalState.view === "waiting-for-customer" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Waiting for customer"
                )}
              {modalState.view === "waiting-for-parts" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Waiting for parts"
                )}
              {modalState.view === "waiting-saw" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Waiting SAW"
                )}
              {modalState.view === "repair-complete" &&
                getMappedJobsByStatusCount(
                  fetchAlldata,
                  dateFrom,
                  dateTo,
                  "Repair complete"
                )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalManagement;
