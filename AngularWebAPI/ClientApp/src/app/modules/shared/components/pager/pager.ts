
export class Pager {

    constructor(totaljobCount: number, pageSize: number) {
        this.totalJobCount = totaljobCount;
        this.pageSize = pageSize;
        this.pageNo = 1;
    }

    totalJobCount: number;
    pageSize: number;
    pageNo: number;

    get totalPages() : number {
        return Math.ceil(this.totalJobCount / this.pageSize);
    }
}