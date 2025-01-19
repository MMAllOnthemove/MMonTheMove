const extractFields = (
    properties: Record<string, string>,
    fields: string[]
): Record<string, string> => {
    return fields.reduce((acc, field) => {
        const matchedKey = Object.keys(properties).find(
            (key) => key.trim() === field
        );
        acc[field] = matchedKey ? properties[matchedKey] : ""; // Default to an empty string
        return acc;
    }, {} as Record<string, string>);
};

export default extractFields;
