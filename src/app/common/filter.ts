export type CategoryFilter = {
    filterName: string;
    projectsCount: number;
    selected: boolean;
}

export type ParentCategoryFilter = {
    categoryName: string;
    expanded: boolean;
    filters: CategoryFilter[];
}

