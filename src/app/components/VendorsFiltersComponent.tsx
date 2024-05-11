import { CategoryFilter, ParentCategoryFilter, VendorFilter } from "../common/filter";
import VendorFilterComponent from "./VendorFilterComponent";


export type VendorsFilterProps = {
    filter: VendorFilter;
    onSelectFilter: (categoryName: keyof VendorFilter, subFilter: CategoryFilter) => void;
    onShowMore: (categoryName: keyof VendorFilter, showMore: boolean) => void;
}

export default function VendorsFiltersComponent({ filter, onShowMore, onSelectFilter }: VendorsFilterProps) {
    return (
        <div className="text-box">
            <h1><a className="text-show active"></a>Filters</h1>
            <ul className="menu menu-show menu-checkbox">
                <VendorFilterComponent filter={filter.typeFilter} category="typeFilter" onSelectFilter={onSelectFilter} onShowMore={onShowMore} />
                <VendorFilterComponent filter={filter.cityFilter} category="cityFilter" onSelectFilter={onSelectFilter} onShowMore={onShowMore} />
                <VendorFilterComponent filter={filter.mallFilter} category="mallFilter" onSelectFilter={onSelectFilter} onShowMore={onShowMore} />
                <VendorFilterComponent filter={filter.brandFilter} category="brandFilter" onSelectFilter={onSelectFilter} onShowMore={onShowMore} />
                <VendorFilterComponent filter={filter.businessCategoryFilter} category="businessCategoryFilter" onSelectFilter={onSelectFilter} onShowMore={onShowMore} />
            </ul>
        </div>
    );
}
