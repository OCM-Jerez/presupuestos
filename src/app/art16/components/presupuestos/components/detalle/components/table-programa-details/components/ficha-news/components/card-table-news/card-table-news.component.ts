import { Component, Input } from '@angular/core';


@Component({
	selector: 'app-card-table-news',
	standalone: true,
	imports: [],
	templateUrl: './card-table-news.component.html',
	styleUrls: ['./card-table-news.component.scss']
})
export class CardTableNewsComponent {
	@Input() filteredNews = [];
}
