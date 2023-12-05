import { atom } from "recoil";

export interface DtvAddTaskModalState {
    open: boolean;
    view: "dtv-add-task";
}
const defaultModalState: DtvAddTaskModalState = {
    open: false,
    view: "dtv-add-task"
}
export const dtvAddTaskModalState = atom<DtvAddTaskModalState>({
    key: 'addTaskModalState',
    default: defaultModalState
})