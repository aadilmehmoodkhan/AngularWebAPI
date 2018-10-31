import { Skill } from "./skill";
import { Category } from "./category";
import { isArray } from "util";

export class Job {

    constructor(
        jobPojo: any = null) {
        if(jobPojo !== null) {
            this.jobID = jobPojo.jobID || null;
            this.title = jobPojo.title || null;
            this.details = jobPojo.details || null;
            this.createdOn = jobPojo.createdOn || null;
            this.postedBy = jobPojo.postedBy || null;
            this.hourlyRate = jobPojo.hourlyRate;
            this.fixedPrice = jobPojo.fixedPrice;
            this.proposalCount = jobPojo.proposalCount || null;

            if(jobPojo.skills && isArray(jobPojo.skills)) {
                jobPojo.skills.forEach(skill => {
                    this.skills.push(new Skill(skill));
                })
            }
            if(jobPojo.categories && isArray(jobPojo.categories)) {
                jobPojo.categories.forEach(category => {
                    this.categories.push(new Category(category));
                })
            }
        }
    }

    jobID: number;
    title: string;
    details: string;
    createdOn: Date;
    postedBy: string;
    hourlyRate?: number;
    fixedPrice?: number;
    proposalCount: number;
    totalJobCount: number;
    skills: Skill[] = [];
    categories: Category[] = [];

    private readonly limit = 500;

    get detailsOverLimit(): boolean {
        return this.details.length > this.limit;
    }

    get shortdetails(): string {
        return (this.detailsOverLimit ? `${this.details.substr(0, this.limit)} ...` : this.details);
    }
}