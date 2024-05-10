import { Vendor } from "../common/types";
import Ratings from "./Ratings";

export type VendorProps =
    {
        vendor: Vendor;
        term: string;
    }

export default function VendorComponent({ vendor, term }: VendorProps) {
    const isPremium = vendor.ip === "1";
    const cardClass = isPremium ? "type-premium" : "";
    const brandName = { __html: vendor.bn ?? "" };

    return (
        <li className={cardClass}>
            <div style={{ "height": "41px" }} data-einvite="32">&nbsp;</div>
            <div className="text-box match-child" style={{ "height": "357.182px" }}>
                {isPremium && (<a className="epremium" href={`/vendor/${vendor.cid}`}>Premium Vendor</a>)}
                <div className="image">
                    <img src={`https://s3.amazonaws.com/4urspace-prod/company_profile/thumbnail/${vendor.pic}`} />
                </div>
                <h2 className="match-child1" style={{ "height": "30px" }}>{vendor.cn}</h2>
                <div className="erate-only match-child2" style={{ "height": "45px" }}>
                    {
                        vendor.nr !== "0" && (
                            <>
                                <p>{vendor.nr} Ratings</p>
                                <Ratings rating={Number.parseInt(vendor.ar ?? "0") ?? 0} />
                            </>
                        )
                    }
                </div>
                {
                    vendor.bn && (<p className="small match-child3" style={{ "height": "21px" }} dangerouslySetInnerHTML={brandName} />)
                }
                <p>{vendor.pc} Projects with {term}</p>
                <form method="post" action="https://4urspace.com/myprojects_messages">
                    <input type="hidden" name="bizcat" value="VENDOR" />
                    <input type="hidden" name="vendor_id" value={vendor.cid} />
                    <button type="submit" className="searchbtn btn btn-primary ">Contact</button>
                </form>
                <a className="text-button" href="/vendor/michilli_inc/ny/new_york/126_5th_avenue/10011/32">SEE DETAILS</a>
            </div>
        </li>

    );
}
