import { atom } from "recoil";

export interface PartsModalState {
    open: boolean;
    view: '/parts'; // we can add other views separating them with | or we can use 'string;'

}

const defaultModalState: PartsModalState = {
    open: false,
    view: '/parts'
}

export const partsModalState = atom<PartsModalState>({
    key: 'partsModalState',
    default: defaultModalState
})