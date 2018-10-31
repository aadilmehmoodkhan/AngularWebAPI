
export class Category {

    constructor(category: any = null) {
        if(category !== null) {
            this.id = category.id || null;
            this.name = category.name;
        }
    }

    id: number;
    name: string;
}