// External imports
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";

// Custom imports
import PageTitle from "@/components/PageTitle";
import {
  getFilteredBookedInJobs,
  getFilteredJobsByStatusCount,
  getMappedBookedInJobs,
  getMappedJobsByStatusCount,
} from "@/functions/pendingUnitsFunc";
import {
  countJobsApprovedAndRejected,
  fetchCurrentUser,
  fetchTableData,
} from "@/hooks/useFetch";
import { minDate } from "../../../../../../../utils/datemin";

// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
const UnitsPendingCard = dynamic(() => import("@/components/UnitsPendingCard"));
const NotLoggedIn = dynamic(() => import("@/components/NotLoggedIn"));
const BookedinUnitsModal = dynamic(
  () => import("@/components/PopupModal/units-pending/bookedin")
);
const RepairInProgressModal = dynamic(
  () => import("@/components/PopupModal/units-pending/repair_in_progress")
);
const WaitingForPartsModal = dynamic(
  () => import("@/components/PopupModal/units-pending/waiting_for_parts")
);
const PartsIssuedModal = dynamic(
  () => import("@/components/PopupModal/units-pending/parts_issued")
);
const PartsToBeOrderedModal = dynamic(
  () => import("@/components/PopupModal/units-pending/parts_to_be_ordered")
);
const CustomerReplyModal = dynamic(
  () => import("@/components/PopupModal/units-pending/customer_reply")
);
const QualityControlModal = dynamic(
  () => import("@/components/PopupModal/units-pending/quality_control")
);
const AssignedToTechModal = dynamic(
  () => import("@/components/PopupModal/units-pending/assigned_to_tech")
);
const FirstApprovalModal = dynamic(
  () => import("@/components/PopupModal/units-pending/first_approval")
);
const QuotePendingModal = dynamic(
  () => import("@/components/PopupModal/units-pending/quote_pending")
);
const QuoteApprovedModal = dynamic(
  () => import("@/components/PopupModal/units-pending/quote_approved")
);
const WaitingForCustomerModal = dynamic(
  () => import("@/components/PopupModal/units-pending/waiting_for_customer")
);
const WaitingSAWModal = dynamic(
  () => import("@/components/PopupModal/units-pending/waiting_saw")
);
const QCFailedModal = dynamic(
  () => import("@/components/PopupModal/units-pending/qc_failed")
);
const SOCancelModal = dynamic(
  () => import("@/components/PopupModal/units-pending/so_cancel")
);
const ScrapApprovedModal = dynamic(
  () => import("@/components/PopupModal/units-pending/scrap_approved")
);
const QuoteRejectedModal = dynamic(
  () => import("@/components/PopupModal/units-pending/quote_rejected")
);
const ForInvoicingModal = dynamic(
  () => import("@/components/PopupModal/units-pending/for_invoicing")
);
const PartsDNAModal = dynamic(
  () => import("@/components/PopupModal/units-pending/parts_dna")
);
const RepairCompleteModal = dynamic(
  () => import("@/components/PopupModal/units-pending/repair_complete")
);

function Pending() {
  var today = new Date().toISOString().split("T")[0].toString();

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const { hhpData } = fetchTableData();
  const { userData } = fetchCurrentUser();
  const { fetchJobsApprovedAndRejected } = countJobsApprovedAndRejected();

  // Modal states
  const [isBookedInUnitsModalVisible, setIsBookedInUnitsModalVisible] =
    useState(false);
  const [isRepairInProgressModalVisible, setIsRepairInProgressModalVisible] =
    useState(false);
  const [isWaitingForPartsModalVisible, setIsWaitingForPartsModalVisible] =
    useState(false);
  const [isPartsIssuedModalVisible, setIsPartsIssuedModalVisible] =
    useState(false);
  const [isPartsOrderedModalVisible, setIsPartsOrderedModalVisible] =
    useState(false);
  const [isScheduledModalVisible, setIsScheduledModalVisible] = useState(false);
  const [isCustomerReplyModalVisible, setIsCustomerReplyModalVisible] =
    useState(false);
  const [isQualityControlModalVisible, setIsQualityControlModalVisible] =
    useState(false);
  const [isAssignedToTechModalVisible, setIsAssignedToTechModalVisible] =
    useState(false);
  const [isFirstApprovalModalVisible, setIsFirstApprovalModalVisible] =
    useState(false);
  const [isQuotePendingModalVisible, setIsQuotePendingModalVisible] =
    useState(false);
  const [isQuoteApprovedModalVisible, setIsQuoteApprovedModalVisible] =
    useState(false);
  const [isWaitingCustomerModalVisible, setIsWaitingCustomerModalVisible] =
    useState(false);
  const [isWaitingSAWModalVisible, setIsWaitingSAWModalVisible] =
    useState(false);
  const [isQCFailedModalVisible, setIsQCFailedModalVisible] = useState(false);
  const [isQCCompletedModalVisible, setIsQCCompletedModalVisible] =
    useState(false);
  const [isQPendingQAodalVisible, setIsPendingQAModalVisible] = useState(false);
  const [isSOCancelodalVisible, setIsSOCancelModalVisible] = useState(false);
  const [isScrapApprovedVisible, setIsScrapApprovedModalVisible] =
    useState(false);
  const [isQuoteRejectedVisible, setIsQuoteRejectedModalVisible] =
    useState(false);
  const [isForInvoicingVisible, setIsForInvoicingModalVisible] =
    useState(false);
  const [isPartsDNAVisible, setIsPartsDNAModalVisible] = useState(false);
  const [isRepairCompleteVisible, setIsRepairCompleteModalVisible] =
    useState(false);
  return (
    <>
      <Head>
        <title>Dashboard | Pending</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <PageTitle hasSpan={false} title={"Units pending"} />

        {!userData ? (
          <NotLoggedIn />
        ) : (
          <>
            <section className="container mx-auto stat_cards max-w-6xl py-4 px-3 lg:px-0">
              <div className="breadcrumb_and_date_filter flex items-center flex-col justify-between lg:flex-row">
                <div className="bg-white p-4 flex items-center flex-wrap dark:bg-[#15202B] dark:border dark:border-[#eee]">
                  <nav aria-label="breadcrumb">
                    <ol className="flex leading-none text-blue-500 divide-x">
                      <li className="pr-4">
                        <Link
                          href="/department/hhp/dashboard"
                          className="inline-flex items-center"
                        >
                          <svg
                            className="w-5 h-auto fill-current mx-2 text-gray-400  dark:text-[#eee]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                          </svg>
                        </Link>
                      </li>

                      <li
                        className="inline-flex items-center px-4 text-gray-700 "
                        aria-current="page"
                      >
                        <Link
                          href="/department/hhp/dashboard/units/pending"
                          className="text-gray-600 hover:text-blue-500 dark:text-[#eee]"
                        >
                          Units pending
                        </Link>
                      </li>

                      <li
                        className="inline-flex items-center px-4 text-gray-700"
                        aria-current="page"
                      >
                        <Link
                          href="/department/hhp/dashboard/engineers"
                          className="text-gray-600 hover:text-blue-500 dark:text-[#eee]"
                        >
                          Engineers
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="flex gap-3 items-center">
                  <span>
                    <label htmlFor="dateFrom" className="sr-only">
                      Date from
                    </label>
                    <input
                      type="date"
                      name="dateFrom"
                      min={minDate}
                      max={today}
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] dark:accent-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="dateFrom"
                    />
                  </span>
                  <span className="">-</span>
                  <span>
                    <label htmlFor="dateTo" className="sr-only">
                      Date to
                    </label>
                    <input
                      type="date"
                      name="dateTo"
                      min={minDate}
                      max={today}
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="mb-2 cursor-pointer bg-white dark:bg-[#22303C] dark:text-[#eee] dark:accent-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="dateTo"
                    />
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm text-center my-3 dark:text-[#eee]">
                The stats here are detailed, for quick counts by engineer, go to{" "}
                <Link
                  href="/department/hhp/dashboard/engineers"
                  className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                  Engineers
                </Link>
              </p>
              <p className="text-center font-medium dark:text-[#eee] text-sm my-3">
                Logged in as{" "}
                <span className="text-sky-700 font-semibold">{userData}</span>
              </p>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 my-3">
                <UnitsPendingCard
                  cardParagraph={"Booked in"}
                  cardHeading={getFilteredBookedInJobs(
                    hhpData,
                    dateFrom,
                    dateTo
                  )}
                  onClick={() => setIsBookedInUnitsModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Repair in progress"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Repair in progress"
                  )}
                  onClick={() => setIsRepairInProgressModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Waiting for parts"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Waiting for parts"
                  )}
                  onClick={() => setIsWaitingForPartsModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Parts issued"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Parts issued"
                  )}
                  onClick={() => setIsPartsIssuedModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Parts to be ordered"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Parts to be ordered"
                  )}
                  onClick={() => setIsPartsOrderedModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Scheduled"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Scheduled"
                  )}
                  onClick={() => setIsScheduledModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Customer reply"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Customer reply"
                  )}
                  onClick={() => setIsCustomerReplyModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Quality Control (QC)"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Quality Control (QC)"
                  )}
                  onClick={() => setIsQualityControlModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Assigned to tech"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Assigned to tech"
                  )}
                  onClick={() => setIsAssignedToTechModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Parts request 1st approval"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Parts request 1st approval"
                  )}
                  onClick={() => setIsFirstApprovalModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Quote pending"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Quote pending"
                  )}
                  onClick={() => setIsQuotePendingModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Quote approved"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Quote approved"
                  )}
                  onClick={() => setIsQuoteApprovedModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Waiting for customer"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Waiting for customer"
                  )}
                  onClick={() => setIsWaitingCustomerModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Waiting SAW"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Waiting SAW"
                  )}
                  onClick={() => setIsWaitingSAWModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"QC failed"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "QC failed"
                  )}
                  onClick={() => setIsQCFailedModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"QC completed"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "QC completed"
                  )}
                  onClick={() => setIsQCCompletedModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Pending Q&A"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Pending Q&A"
                  )}
                  onClick={() => setIsPendingQAModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"SO cancel"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "SO cancel"
                  )}
                  onClick={() => setIsSOCancelModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Scrap approved"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Scrap approved"
                  )}
                  onClick={() => setIsScrapApprovedModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Quote rejected"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Quote rejected"
                  )}
                  onClick={() => setIsQuoteRejectedModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"For invoicing"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "For invoicing"
                  )}
                  onClick={() => setIsForInvoicingModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Parts DNA"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Parts DNA"
                  )}
                  onClick={() => setIsPartsDNAModalVisible(true)}
                />
                <UnitsPendingCard
                  cardParagraph={"Repair complete"}
                  cardHeading={getFilteredJobsByStatusCount(
                    hhpData,
                    dateFrom,
                    dateTo,
                    "Repair complete"
                  )}
                  onClick={() => setIsRepairCompleteModalVisible(true)}
                />
              </div>
            </section>
            {/* Modals */}
            <BookedinUnitsModal
              isVisible={isBookedInUnitsModalVisible}
              title={"Booked in"}
              content={getMappedBookedInJobs(hhpData, dateFrom, dateTo)}
              onClose={() => setIsBookedInUnitsModalVisible(false)}
            />
            <RepairInProgressModal
              isVisible={isRepairInProgressModalVisible}
              title={"Repair in progress"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Repair in progress"
              )}
              onClose={() => setIsRepairInProgressModalVisible(false)}
            />
            <WaitingForPartsModal
              isVisible={isWaitingForPartsModalVisible}
              title={"Waiting for parts"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Waiting for parts"
              )}
              onClose={() => setIsWaitingForPartsModalVisible(false)}
            />
            <PartsIssuedModal
              isVisible={isPartsIssuedModalVisible}
              title={"Parts issued"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Parts issued"
              )}
              onClose={() => setIsPartsIssuedModalVisible(false)}
            />
            <PartsToBeOrderedModal
              isVisible={isPartsOrderedModalVisible}
              title={"Parts to be ordered"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Parts to be ordered"
              )}
              onClose={() => setIsPartsOrderedModalVisible(false)}
            />
            <PartsToBeOrderedModal
              isVisible={isScheduledModalVisible}
              title={"Scheduled"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Scheduled"
              )}
              onClose={() => setIsScheduledModalVisible(false)}
            />
            <CustomerReplyModal
              isVisible={isCustomerReplyModalVisible}
              title={"Customer reply"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Customer reply"
              )}
              onClose={() => setIsCustomerReplyModalVisible(false)}
            />
            <QualityControlModal
              isVisible={isQualityControlModalVisible}
              title={"Quality Control (QC)"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Quality Control (QC)"
              )}
              onClose={() => setIsQualityControlModalVisible(false)}
            />
            <AssignedToTechModal
              isVisible={isAssignedToTechModalVisible}
              title={"Assigned to tech"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Assigned to tech"
              )}
              onClose={() => setIsAssignedToTechModalVisible(false)}
            />
            <FirstApprovalModal
              isVisible={isFirstApprovalModalVisible}
              title={"Parts request 1st approval"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Parts request 1st approval"
              )}
              onClose={() => setIsFirstApprovalModalVisible(false)}
            />
            <QuotePendingModal
              isVisible={isQuotePendingModalVisible}
              title={"Quote pending"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Quote pending"
              )}
              onClose={() => setIsQuotePendingModalVisible(false)}
            />
            <QuoteApprovedModal
              isVisible={isQuoteApprovedModalVisible}
              title={"Quote approved"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Quote approved"
              )}
              onClose={() => setIsQuoteApprovedModalVisible(false)}
            />
            <WaitingForCustomerModal
              isVisible={isWaitingCustomerModalVisible}
              title={"Waiting for customer"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Waiting for customer"
              )}
              onClose={() => setIsWaitingCustomerModalVisible(false)}
            />
            <WaitingSAWModal
              isVisible={isWaitingSAWModalVisible}
              title={"Waiting SAW"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Waiting SAW"
              )}
              onClose={() => setIsWaitingSAWModalVisible(false)}
            />
            <QCFailedModal
              isVisible={isQCFailedModalVisible}
              title={"QC completed"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "QC completed"
              )}
              onClose={() => setIsQCFailedModalVisible(false)}
            />
            <QCFailedModal
              isVisible={isQCCompletedModalVisible}
              title={"QC completed"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "QC completed"
              )}
              onClose={() => setIsQCCompletedModalVisible(false)}
            />
            <QCFailedModal
              isVisible={isQPendingQAodalVisible}
              title={"Pending Q&A"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Pending Q&A"
              )}
              onClose={() => setIsPendingQAModalVisible(false)}
            />
            <SOCancelModal
              isVisible={isSOCancelodalVisible}
              title={"SO cancel"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "SO cancel"
              )}
              onClose={() => setIsSOCancelModalVisible(false)}
            />
            <ScrapApprovedModal
              isVisible={isScrapApprovedVisible}
              title={"Scrap approved"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Scrap approved"
              )}
              onClose={() => setIsScrapApprovedModalVisible(false)}
            />
            <QuoteRejectedModal
              isVisible={isQuoteRejectedVisible}
              title={"Quote rejected"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Quote rejected"
              )}
              onClose={() => setIsQuoteRejectedModalVisible(false)}
            />
            <ForInvoicingModal
              isVisible={isForInvoicingVisible}
              title={"For invoicing"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "For invoicing"
              )}
              onClose={() => setIsForInvoicingModalVisible(false)}
            />
            <PartsDNAModal
              isVisible={isPartsDNAVisible}
              title={"Parts DNA"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Parts DNA"
              )}
              onClose={() => setIsPartsDNAModalVisible(false)}
            />
            <RepairCompleteModal
              isVisible={isRepairCompleteVisible}
              title={"Repair complete"}
              content={getMappedJobsByStatusCount(
                hhpData,
                dateFrom,
                dateTo,
                "Repair complete"
              )}
              onClose={() => setIsRepairCompleteModalVisible(false)}
            />
          </>
        )}
      </main>
    </>
  );
}

export default Pending;
