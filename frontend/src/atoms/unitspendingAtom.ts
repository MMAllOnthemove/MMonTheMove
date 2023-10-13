import { atom } from "recoil";

export interface UnitsPendingModalState {
    open: boolean;
    view: ModalView; // we can add other views separating them with | or we can use 'string;'

}
export type ModalView = 'assigned-to-tech' | 'booked-in' | 'customer-reply' | 'first-approval' | 'for-invoicing' | 'parts-dna' | 'parts-issued' | 'parts-to-be-ordered' | 'pending-q-and-a' | 'qc-completed' | 'qc-failed' | 'quality-control' | 'quote-approved' | 'quote-pending' | 'quote-rejected' | 'repair-complete' | 'repair-in-progress' | 'scheduled' | 'scrap-approved' | 'so-cancel' | 'waiting-for-customer' | 'waiting-for-parts' | 'waiting-saw'
const defaultModalState: UnitsPendingModalState = {
    open: false,
    view: 'assigned-to-tech' // initial one
}

export const unitsPendingReportModalState = atom<UnitsPendingModalState>({
    key: 'unitsPendingReportModalState',
    default: defaultModalState
})