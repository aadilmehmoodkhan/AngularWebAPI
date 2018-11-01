import { Component, Input, Output } from '@angular/core';
import { Pager } from './pager';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {

  constructor() { }

  @Input() set pageNo(val) { this.pager.pageNo = val; }
  @Input() set totalJobCount(val) { this.pager.totalJobCount = val; }
  @Input() set pageSize(val) { this.pager.pageSize = val; }
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  pager: Pager = new Pager(this.totalJobCount, this.pageSize);

  firstPage() {
    this.pageChanged.emit(1);
  }

  nextPage() {
    if(this.pager.pageNo < this.pager.totalPages) {
      this.pageChanged.emit(+this.pager.pageNo + 1);
    }
  }
  previousPage() {
    if(this.pager.pageNo > 1) {
      this.pageChanged.emit(+this.pager.pageNo - 1);
    }
  }

  lastPage() {
    this.pageChanged.emit(this.pager.totalPages);
  }

}
