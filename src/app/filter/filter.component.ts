import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public name: string;
  public type: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.name = f.value.name;
    this.type = f.value.type;

    this.router.navigate(['/filter', this.name, this.type]);
  }

}
