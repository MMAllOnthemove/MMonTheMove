// Find changes between original and updated data
const findChanges = (original: any, updated: any) => {
    const changes: any = {};
    for (const key in updated) {
        if (original[key] !== updated[key]) {
            changes[key] = updated[key];
        }
    }
    return changes;
};
export default findChanges;
