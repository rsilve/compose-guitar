export function storage_iterator(): { key: string, value: string | null }[] {
    return Object.keys(localStorage).map(value => {
        return {key: value, value: localStorage.getItem(value)}
    })
}