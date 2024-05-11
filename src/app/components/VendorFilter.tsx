import { ParentCategoryFilter } from "../common/filter";

export type VendorFilterProps = {
    filter: ParentCategoryFilter;
}

export default function VendorFilterComponent({ filter }: VendorFilterProps) {
    console.error(filter.expanded)
    return (
        <li className="parent parent-show" id="vendortype_filter_parent">
            <a className={`text-show ${filter.expanded ? "" : "active"}`}></a><h2>{filter.categoryName}</h2>
            {filter.expanded && filter.filters.length && (
                <ul style={{ "display": "block" }}>
                    {
                        filter.filters.map(f => (
                            <li key={`sub-${f.filterKey}`}>
                                <input className="large" type="checkbox" data-key="8139" data-filtertype="vendortype" />
                                <span className="text-checkbox"></span><span className="text-checkbox"></span>
                                <label dangerouslySetInnerHTML={{ __html: `${f.filterName} (${f.projectsCount})` }}></label>
                            </li>
                        ))
                    }
                </ul>
            )}
        </li>
    );
}
