import { Component, OnInit } from '@angular/core';
import { DataService} from '../_services/data.service';
import { ItemModel } from '../_models/item.type';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  items: ItemModel[];
  routerParams;

  sub: Subscription;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.routerParams = params;
      this.getItems();
    });
  }
  public getItems() {
    this.sub = this.dataService.getItems()
      .pipe(
        map( results => results.filter(r => r.name.includes(this.routerParams.name) && r.type.includes(this.routerParams.type)) )
      )
      .subscribe((result) => {
          this.items = result;
        }
      );
  }



}
