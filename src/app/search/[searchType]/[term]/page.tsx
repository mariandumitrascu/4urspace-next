'use client'

import { Category, Mall, Vendor } from "@/app/common/types";
import VendorComponent from "@/app/components/vendor";
import { useEffect, useState } from "react";

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

                // I used Set to remove duplicates, I had to change tsconfig.json to add:
                //   "target": "es2015",
                //   "downlevelIteration": true
                v.malls = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.mid ?? ""))] ?? [];
                v.citys = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.city ?? ""))] ?? [];
                v.bcatgs = [...new Set(categories?.filter(m => m.cid == v.cid).map(m => m.cgid ?? ""))] ?? [];

                // these two, I'm not sure which one is correct. Some times they are the same, sometimes they are different
                // However, the count of them is the same.
                v.prjs = [...new Set(categories?.filter(m => m.cid == v.cid).map(m => m.pid ?? ""))] ?? [];
                v.prjs2 = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.pid ?? ""))] ?? [];
            });
            console.warn(vendors)
            setVendors(vendors ?? []);
        }

        fetchAllData();
    }, []);

    return (
        <section className="section section-searchresult" id="section-searchresult">
            <div className="row row-form normal">
                <div className="text-box">
                    <h1><a className="text-show active"></a>Filters</h1>
                </div>
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
    );
}

//export default SearchResult;