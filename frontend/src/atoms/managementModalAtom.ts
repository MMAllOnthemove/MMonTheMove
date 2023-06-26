import { atom } from "recoil";

export interface ManagementModalState {
    open: boolean;
    view: 'management'; // we can add other views separating them with | or we can use 'string;'

}

const defaultModalState: ManagementModalState = {
    open: false,
    view: 'management'
}

export const managementModalState = atom<ManagementModalState>({
    key: 'managementModalState',
    default: defaultModalState
})