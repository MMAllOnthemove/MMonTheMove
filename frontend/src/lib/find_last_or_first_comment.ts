export const processArrayComments = (array: any) => {
    if (array.length === 0) {
        return;
    }

    // If the array has only one object, find it without removing
    if (array.length === 1) {
        const lastObject = array[0];
        return lastObject;
    }

    // Remove the last object if there are multiple
    const removedObject = array.splice(array.length - 1, 1)[0];

    return removedObject;
};
