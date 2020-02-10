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
  public searchData: SearchModel;
  public dataSource: MatTableDataSource<ItemModel>;
  public columnsToDisplay = ['id', 'name', 'type'];

  private itemsSub: Subscription;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource<ItemModel>();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.searchData = params;
      this.getItems();
    });
  }

  public getItems() {
    this.itemsSub = this.dataService.getItems()
      .pipe(
        map(results => results.filter(r => r.name.includes(this.searchData.name) && r.type.includes(this.searchData.type)))
      )
      .subscribe((result) => {
        this.dataSource = result;
        if (this.dataSource) {
          this.dataTable.renderRows();
        }
      }
      );
  }



}
