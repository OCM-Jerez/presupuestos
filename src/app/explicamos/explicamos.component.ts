import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explicamos',
  templateUrl: './explicamos.component.html',
  styleUrls: ['./explicamos.component.scss']
})
export class ExplicamosComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }


}
