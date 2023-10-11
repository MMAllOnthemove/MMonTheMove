import { atom } from "recoil";

export interface BookingsReportModalState {
    open: boolean;
    view: ModalView; // we can add other views separating them with | or we can use 'string;'

}
export type ModalView = 'shanes300123' | 'sherryl060223' | 'nigelc01' | 'lavonaj01'
const defaultModalState: BookingsReportModalState = {
    open: false,
    view: 'shanes300123' // initial one
}

export const bookingsReportModalState = atom<BookingsReportModalState>({
    key: 'bookingsReportModalState',
    default: defaultModalState
})