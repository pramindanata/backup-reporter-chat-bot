export function formatToReadableFileSize(byte: number): string {
  const byteToKiloBase = 1000;
  const byteToMegaBase = 1000 ** 2;

  if (byte < byteToKiloBase) {
    return `${byte} B`;
  } else if (byte < 100 * byteToKiloBase) {
    const result = byte / byteToKiloBase;

    return `${result.toFixed(1)} KB`;
  }

  const result = byte / byteToMegaBase;

  return `${result.toFixed(1)} MB`;
}
