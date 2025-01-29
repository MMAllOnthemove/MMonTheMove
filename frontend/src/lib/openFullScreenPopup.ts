"use client";
const openFullScreenPopup = (url: string) => {
    // const features = `width=${screen.availWidth},height=${screen.availHeight},top=0,left=0,scrollbars=yes,resizable=yes`;
    const features = `width=600,height=400,scrollbars=yes,resizable=yes`;
    if (typeof window !== "undefined") window.open(url, "_blank", features);
};
export default openFullScreenPopup;
