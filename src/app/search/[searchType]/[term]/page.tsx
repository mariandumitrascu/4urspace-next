'use client'

import { CategoryFilter, ParentCategoryFilter, VendorFilter } from "@/app/common/filter";
import { Category, Mall, Vendor } from "@/app/common/types";
import Marketplace from "@/app/components/Marketplace";
import SearchHeader from "@/app/components/Header";
import VendorComponent from "@/app/components/Vendor";
import VendorsFiltersComponent from "@/app/components/VendorsFiltersComponent";
import { useEffect, useState } from "react";
import groupAndCount from "@/app/common/mallUtils";

type SearchType = "city" | "mall" | "brand" | "state";
type SearchParams = {
    searchType: SearchType;
    term: string;
}

type SearchResultProps = {
    params: SearchParams;
};

export default function SearchResult({ params: { term, searchType } }: SearchResultProps) {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [globalFilter, setGlobalFilter] = useState<VendorFilter>();
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch(`/api/vendors?q=${term}&t=${searchType}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Vendor[] = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to fetch vendors:', error);
            } finally { }
        };

        const fetchMalls = async () => {
            try {
                const response = await fetch(`/api/malls?q=${term}&t=${searchType}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Mall[] = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to fetch malls:', error);
            } finally { }
        }

        const fetchCategories = async () => {
            try {
                const response = await fetch(`/api/categories?q=${term}&t=${searchType}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Category[] = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally { }
        }

        const fetchAllData = async () => {
            const vendors = await fetchVendors();
            const malls = await fetchMalls();
            const categories = await fetchCategories();

            vendors?.forEach(v => {
                v.brands = malls?.filter(m => m.cid == v.cid).map(m => m.bid ?? "") ?? [];

                v.malls = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.mid ?? ""))] ?? [];
                v.citys = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.city ?? ""))] ?? [];
                v.bcatgs = [...new Set(categories?.filter(m => m.cid == v.cid).map(m => m.cgid ?? ""))] ?? [];

                v.prjs = [...new Set(categories?.filter(m => m.cid == v.cid).map(m => m.pid ?? ""))] ?? [];
                v.prjs2 = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.pid ?? ""))] ?? [];
            });

            const typeResult = vendors!.reduce((acc, vendor) => {
                if (!acc[vendor.bid]) {
                    acc[vendor.bid] = { filterKey: vendor.bid, filterName: vendor.bn, projectsCount: 0, selected: false };
                }
                acc[vendor.bid].projectsCount++;
                return acc;
            }, {} as { [bid: string]: { filterKey: string, filterName: string, projectsCount: number, selected: boolean } });

            const types = Object.values(typeResult).sort((a, b) => (a.filterName > b.filterName) ? 1 : (a.filterName < b.filterName) ? -1 : 0);

            const mallFilters = groupAndCount(malls!).map(r => ({ filterKey: r.city, filterName: r.city, projectsCount: r.count, selected: false }))
                .sort((a, b) => (a.filterName > b.filterName) ? 1 : (a.filterName < b.filterName) ? -1 : 0);

            setGlobalFilter({
                typeFilter: { categoryName: "By Type", filters: types, expanded: true, showMore: true },
                cityFilter: { categoryName: "By City", filters: mallFilters, expanded: true, showMore: true },
                mallFilter: { categoryName: "By Type", filters: types, expanded: true, showMore: true },
                brandFilter: { categoryName: "By Type", filters: types, expanded: true, showMore: true },
                businessCategiryFilter: { categoryName: "By Type", filters: types, expanded: false, showMore: true },
            });
            setVendors(vendors ?? []);
        }

        fetchAllData();
    }, []);

    const updateFiltersHandler = (categoryName: keyof VendorFilter, subFilter: CategoryFilter) => {
        const filter = { ...globalFilter, [categoryName]: { ...globalFilter![categoryName] } };
        const filters = filter[categoryName]!.filters;
        const index = filters.findIndex(f => f.filterKey == subFilter.filterKey);
        filters[index] = subFilter;
        setGlobalFilter(filter as VendorFilter);
    }

    const showMoreHandler = (categoryName: keyof VendorFilter, showMore: boolean) => {
        const filter = { ...globalFilter };
        filter[categoryName]!.showMore = showMore;
        setGlobalFilter(filter as VendorFilter);
    }

    return (
        <div className="nav_view" id="epage">
            <SearchHeader />
            <div className="container">
                <Marketplace term={term} searchType={searchType} />

                <section className="section section-searchresult" id="section-searchresult">
                    <div className="row row-form normal">
                        {globalFilter && (<VendorsFiltersComponent filter={globalFilter} onSelectFilter={updateFiltersHandler} onShowMore={showMoreHandler} />)}
                    </div>
                    <div className="row row-title normal">
                        <h1 id="vendorcount">{vendors.length} Found</h1>
                        <ul className="text-list" id="pagination">
                            <li><a className="active">1</a>
                            </li><li><a >2</a></li>
                        </ul>
                        <div className="einvite" data-einvite="rfpvendors" data-max="5">
                            <form action="/dashboard/rfp" method="post" id="rfpform">
                                <input type="hidden" name="hdnaction" id="hdnaction" value="vendorsearch" />
                                <div className="einvite-section">
                                    <h2>Request a Proposal</h2>
                                    <p><span className="einvite-selected">0</span> <strong>Vendors selected</strong></p>
                                    <a className="einvite-submit">Next</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row row-list">
                        <ul className="text-list match-parent" id="vendor_results">
                            {
                                vendors && vendors.length && (
                                    vendors.map((v) => <VendorComponent vendor={v} term={term} key={`vendor-${v.cid}`} />)
                                )
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </div>

    );
}

//export default SearchResult;