export const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
//const isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
//const isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;

export function ctrlOrCommand(e: KeyboardEvent): boolean {
    return isMac ? e.metaKey : e.ctrlKey
}

export function ctrlOrCommendKeyName(): string {
    return isMac ? "Cmd" : "Ctrl"
}