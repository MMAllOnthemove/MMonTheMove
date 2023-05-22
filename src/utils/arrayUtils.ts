type Item = {
    id: string,
}

/* This is a Wonderfull Generic :3 */
export const findItemIndexById = <TItem extends Item>(
    items: TItem[],
    id: string
) => {
    return items.findIndex((item: TItem) => item.id === id)
}

/* Recreates a Array After removing something from the position */
export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
}
/* Rearrange inserting the item into a empty (we expect) position of the array */
export function insertItemAtIndex<TItem>(
    array: TItem[],
    item: TItem,
    index: number
) {
    return [...array.slice(0, index), item, ...array.slice(index)]
}

/* Moves item to a specific position in the array */
export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
    const item = array[from]
    return insertItemAtIndex(removeItemAtIndex(array, from), item, to)
}