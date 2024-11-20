export function processArrayComments(array: any) {
    if (array.length === 0) {
        // console.log("Array is empty!");
        return;
    }

    // If the array has only one object, find it without removing
    if (array.length === 1) {
        const lastObject = array[0];
        // console.log("Only object in the array:", lastObject);
        return lastObject;
    }

    // Remove the last object if there are multiple
    const removedObject = array.splice(array.length - 1, 1)[0];
    // console.log("Removed last object:", removedObject);
    // console.log("Remaining array:", array);

    return removedObject;
}
