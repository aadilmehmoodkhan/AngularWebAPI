import { Job } from "./job";

export class JobPage {

    constructor(jobPage: any) {
        this.data = [];
        this.totalJobCount = jobPage.totalJobCount;
        this.pageSize = jobPage.pageSize;
        this.pageNo = jobPage.pageNo;
        jobPage.data.forEach(j => this.data.push(new Job(j)));
    }

    totalJobCount: number;
    pageSize: number;
    pageNo: number;
    data: Job[];

    get totalPages() : number {
        return Math.ceil(this.totalJobCount / this.pageSize);
    }

}