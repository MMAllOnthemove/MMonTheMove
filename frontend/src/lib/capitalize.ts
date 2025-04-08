export const capitalizeText = (name: string): string => {
    if (!name) return ""; // Return an empty string if the input is falsy
    return name.charAt(0).toUpperCase() + name.slice(1)?.toLowerCase();
};
