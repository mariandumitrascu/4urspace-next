import { VendorFilter } from "../common/filter";
import VendorFilterComponent from "./VendorFilter";


export type VendorsFilterProps = {
    filter: VendorFilter;
}

export default function VendorsFiltersComponent({ filter }: VendorsFilterProps) {
    return (
        <div className="text-box">
            <h1><a className="text-show active"></a>Filters</h1>
            <ul className="menu menu-show menu-checkbox">
                <VendorFilterComponent filter={filter.typeFilter} />
            </ul>
        </div>
    );
}
