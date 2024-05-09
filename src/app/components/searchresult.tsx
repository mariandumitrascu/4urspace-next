export default function SearchResult() {
    return (
        <section className="section section-searchresult" id="section-searchresult">
            <div className="row row-form normal">
                <div className="text-box">
                    <h1><a className="text-show active"></a>Filters</h1>
                </div>
            </div>
            <div className="row row-title normal">
                <h1 id="vendorcount">879 Found</h1>
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
                    <li className="type-premium">
                        <div style={{ "height": "41px" }} data-einvite="32">&nbsp;</div>
                        <div className="text-box match-child" style={{ "height": "357.182px" }}>
                            <a className="epremium" href="/vendor/32">Premium Vendor</a>
                            <div className="image">
                                <img src="https://s3.amazonaws.com/4urspace-prod/company_profile/thumbnail/32_1658836042_MICHILLIINC.JPG" />
                            </div>
                            <h2 className="match-child1" style={{ "height": "30px" }}>MICHILLI INC</h2>
                            <div className="erate-only match-child2" style={{ "height": "45px" }}>
                                <p>4 Ratings</p>
                                <ul className="erate-star">
                                    <li className="active"></li>
                                    <li className="active"></li>
                                    <li className="active"></li>
                                    <li className="active"></li>
                                    <li className="active"></li>
                                </ul>
                            </div>
                            <p className="small match-child3" style={{ "height": "21px" }}>General Contractor</p>
                            <p>256 Projects with New York</p>
                            <form method="post" action="https://4urspace.com/myprojects_messages">
                                <input type="hidden" name="bizcat" value="VENDOR" />
                                <input type="hidden" name="vendor_id" value="32" />
                                <button type="submit" className="searchbtn btn btn-primary ">Contact</button>
                            </form>
                            <a className="text-button" href="/vendor/michilli_inc/ny/new_york/126_5th_avenue/10011/32">SEE DETAILS</a>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}
