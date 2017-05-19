export class ToDo{

    id:string;
    description:string;
    complete:string;

    constructor(description:string, complete?:string, id?:string){
        this.description = description;
        if(complete) this.complete = complete;
        if(id) this.id = id;
    }
}