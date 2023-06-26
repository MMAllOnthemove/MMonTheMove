import { atom } from "recoil";


export interface HomepageModalState {
    open: boolean;
    view: '/'; // we can add other views separating them with | or we can use 'string;'

}

const defaultHomeModalState: HomepageModalState = {
    open: false,
    view: '/'
}

export const homepageModalState = atom<HomepageModalState>({
    key: 'homepageModalState',
    default: defaultHomeModalState
})