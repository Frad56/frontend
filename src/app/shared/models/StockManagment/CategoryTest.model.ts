export interface CategoryTest {
    categoryId: number;
    name: string;
    description?: string;
    parentId?: number | null;
    children: CategoryTest[];
  }