export const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

export function ctrlOrCommand(e: KeyboardEvent): boolean {
  return isMac ? e.metaKey : e.ctrlKey;
}

export function ctrlOrCommendKeyName(): string {
  return isMac ? 'Cmd' : 'Ctrl';
}
