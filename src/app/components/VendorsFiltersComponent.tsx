import { CategoryFilter, VendorFilter } from "../common/filter";
import VendorFilterComponent from "./VendorFilterComponent";


export type VendorsFilterProps = {
    filter: VendorFilter;
    onSelectFilter: (categoryName: keyof VendorFilter, subFilter: CategoryFilter) => void;
}

export default function VendorsFiltersComponent({ filter, onSelectFilter }: VendorsFilterProps) {
    return (
        <div className="text-box">
            <h1><a className="text-show active"></a>Filters</h1>
            <ul className="menu menu-show menu-checkbox">
                <VendorFilterComponent filter={filter.typeFilter} category="typeFilter" onSelectFilter={onSelectFilter} />
            </ul>
        </div>
    );
}
