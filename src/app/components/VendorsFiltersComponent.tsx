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
                {Object.entries(filter).map(([key, value]) => {
                    return (
                        <VendorFilterComponent key={key} filter={value} category={key as keyof VendorFilter} onSelectFilter={onSelectFilter} onShowMore={onShowMore} />
                    );
                })}
            </ul>
        </div>
    );
}
