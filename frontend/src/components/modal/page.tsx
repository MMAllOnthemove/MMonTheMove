import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
export interface IPopupModal {
    isVisible?: true | false;
    title: string | number | null | undefined;
    description?: string | number | null | undefined;
    content: string | number | boolean | React.ReactNode | any;
    onClose: () => void;
    footer?: string | number | boolean | React.ReactNode | any;
}
function Modal({
    isVisible = false,
    title,
    description,
    content,
    footer,
    onClose,
}: IPopupModal) {
    const keydownHandler = ({ key }: { key: string | number }) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
    });

    return !isVisible ? null : (
        <div
            className="fixed top-0 bottom-0 left-0 inset-0 right-0 z-50 flex items-center justify-center bg-black/80 transition ease-in-out duration-300 rounded-sm"
        // todo: uncomment
        // onClick={onClose}
        >
            <div
                className="w-full max-w-lg sm:rounded-lg p-6 bg-white relative my-0 mx-[20px] text-left flex flex-col overflow-y-auto max-h-[540px] popup-modal-dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-2 pb-2">
                    <div>
                        <h3 className="text-lg font-semibold leading-none tracking-tight">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <button
                        className="text-slate-800 cursor-pointer outline-none border-none"
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
                <div className="overflow-auto">
                    <div>{content}</div>
                </div>
                {footer && (
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;