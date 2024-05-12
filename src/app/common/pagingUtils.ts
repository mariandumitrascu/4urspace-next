export function getPageData<T>(data: T[], pageSize: number, pageNumber: number): T[] {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}