import React from "react";
import { IPopupModal } from "../../../utils/interfaces";

function TicketsModal({
    isVisible = false,
    title,
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
            className="fixed top-0 bottom-0 left-0 right-0 w-full z-[9999] flex items-center justify-center bg-[#00000040] transition ease-in-out duration-300 rounded-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[550px] bg-white dark:bg-[#22303C] relative my-0 mx-[20px] text-left flex flex-col overflow-hidden popup-modal-dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center p-[1rem] border-b border-blue-[#eee] justify-between">
                    <h3 className="text-slate-800 font-medium dark:text-[#eee]">
                        {title}
                    </h3>
                    <span
                        className="text-slate-800 cursor-pointer font-bold text-md dark:text-[#eee]"
                        onClick={onClose}
                    >
                        &times;
                    </span>
                </div>
                <div className="overflow-auto">
                    <div className="p-[1rem]">{content}</div>
                </div>
                {footer && (
                    <div className="flex items-center p-[1rem]border-t border-[#eee] justify-end dark:text-[#eee]">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TicketsModal;
