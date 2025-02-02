"use client";
const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow && typeof window !== "undefined") newWindow.opener = null;
};
export default openInNewTab;
