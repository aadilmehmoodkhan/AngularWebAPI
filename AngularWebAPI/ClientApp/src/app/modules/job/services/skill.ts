
export class Skill {

    constructor(skill: any = null) {
        if(skill !== null) {
            this.id = skill.id || null;
            this.name = skill.name;
        }
    }

    id: number;
    name: string;
}