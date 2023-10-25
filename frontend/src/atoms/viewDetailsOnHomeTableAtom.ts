import { atom } from "recoil";

export interface ViewDetailsOnHomeTableModalState {
    open: boolean;
    view: ModalView; // we can add other views separating them with | or we can use 'string;'

}
export type ModalView = "view-job-details";
const defaultModalState: ViewDetailsOnHomeTableModalState = {
    open: false,
    view: "view-job-details"
}
export const viewDetailsOnHomeTableModalState = atom<ViewDetailsOnHomeTableModalState>({
    key: 'viewDetailsOnHomeTableModalState',
    default: defaultModalState
})