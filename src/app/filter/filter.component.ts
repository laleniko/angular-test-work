import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { SearchModel } from '../_models/search.type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public searchData: SearchModel = {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public search(form: NgForm) {
    this.searchData = form.value;
    this.router.navigate(['/filter', this.searchData.name, this.searchData.type]);
  }
}
