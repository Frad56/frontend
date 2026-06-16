export class Category {
    categoryId!: number;
    name!: string;
    description!:string;
    parentId!:number;
    constructor(categoryId: number ,name:string,description :string,parentId:number) {
        this.categoryId = categoryId;
        this.name = name;
        this.description= description;
        this.parentId=parentId;

    }
}