import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-card-table-news',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card-table-news.component.html',
	styleUrls: ['./card-table-news.component.scss']
})
export class CardTableNewsComponent {
	@Input() filteredNews = [];
}
