
export interface PostNewJob {
    title: string;
    details: string;
    hourlyRate?: number;
    fixedPrice?: number;
    skills: number[];
    categories: number[];
}