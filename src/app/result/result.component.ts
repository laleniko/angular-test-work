import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../_services/data.service';
import { ItemModel } from '../_models/item.type';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatTable } from '@angular/material';
import { SearchModel } from '../_models/search.type';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @ViewChild('dataTable', { static: false }) dataTable: MatTable<any>;
  routerParams: SearchModel;
  dataSource: MatTableDataSource<ItemModel>;
  columnsToDisplay = ['id', 'name', 'type'];

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
        map(results => results.filter(r => r.name.includes(this.routerParams.name) && r.type.includes(this.routerParams.type)))
      )
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource<ItemModel>(result);
        if (this.dataSource) {
          this.dataTable.renderRows();
        }
      }
      );
  }



}
