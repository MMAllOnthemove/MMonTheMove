import { atom } from "recoil";

export interface CreateChecklistModalState {
    open: boolean;
    view: "dtv-add-checklist";
}
const defaultModalState: CreateChecklistModalState = {
    open: false,
    view: 'dtv-add-checklist'
}
export const createChecklistModalState = atom<CreateChecklistModalState>({
    key: 'createChecklistModalState',
    default: defaultModalState
})