export function headerHeightGetter(params: any) {
	const columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');
	const columnHeaderTextsArray: Element[] = [];
	columnHeaderTexts.forEach((node) => columnHeaderTextsArray.push(node));
	const clientHeights = columnHeaderTextsArray.map((headerText) => headerText.clientHeight);
	const tallestHeaderTextHeight = Math.max(...clientHeights);
	return tallestHeaderTextHeight;
}
