// Find changes between original and updated data
const findChanges = (original: unknown, updated: unknown) => {
    const changes: unknown = {};
    for (const key in updated) {
        if (original[key] !== updated[key]) {
            changes[key] = updated[key];
        }
    }
    return changes;
};
export default findChanges;
