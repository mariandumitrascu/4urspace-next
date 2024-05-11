export type CategoryFilter = {
    filterName: string;
    filterKey: string;
    projectsCount: number;
    selected: boolean;
}

export type ParentCategoryFilter = {
    categoryName: string;
    expanded: boolean;
    filters: CategoryFilter[];
}

export type VendorFilter = {
    typeFilter: ParentCategoryFilter;
    cityFilter: ParentCategoryFilter;
    mallFilter: ParentCategoryFilter;
    brandFilter: ParentCategoryFilter;
    businessCategiryFilter: ParentCategoryFilter;
}
