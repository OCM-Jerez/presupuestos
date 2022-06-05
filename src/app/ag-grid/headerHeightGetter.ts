export function headerHeightGetter(params: any) {
    var columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');
    var columnHeaderTextsArray: Element[] = [];
    columnHeaderTexts.forEach(node => columnHeaderTextsArray.push(node));
    var clientHeights = columnHeaderTextsArray.map(
        headerText => headerText.clientHeight
    );
    var tallestHeaderTextHeight = Math.max(...clientHeights);
    return tallestHeaderTextHeight;

}