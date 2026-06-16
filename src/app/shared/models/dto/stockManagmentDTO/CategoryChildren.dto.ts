export interface CategoryChildren {
    categoryId: number;
    name: string;
    children?: CategoryChildren[];
  }