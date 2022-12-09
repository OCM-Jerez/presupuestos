export function headerHeightGetter(params: any) {
    let columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');
    let columnHeaderTextsArray: Element[] = [];
    columnHeaderTexts.forEach(node => columnHeaderTextsArray.push(node));
    let clientHeights = columnHeaderTextsArray.map(
        headerText => headerText.clientHeight
    );
    let tallestHeaderTextHeight = Math.max(...clientHeights);
    return tallestHeaderTextHeight;

}