import { Mall } from "./types";

export default function groupAndCount(malls: Mall[]): { city: string; count: number }[] {
    // Step 1: Filter out only those entries that have both 'cid' and 'city'
    const filteredMalls = malls.filter(mall => mall.cid && mall.city);

    // Step 2: Group by 'cid'
    const cidGroup = new Map<string, Mall[]>();
    filteredMalls.forEach(mall => {
        if (!cidGroup.has(mall.cid!)) {
            cidGroup.set(mall.cid!, []);
        }
        cidGroup.get(mall.cid!)!.push(mall);
    });

    // Step 3: Regroup by 'city'
    const cityGroup = new Map<string, Set<string>>();
    cidGroup.forEach((value, key) => {
        value.forEach(mall => {
            if (!cityGroup.has(mall.city!)) {
                cityGroup.set(mall.city!, new Set());
            }
            cityGroup.get(mall.city!)!.add(key);
        });
    });

    // Step 4: Prepare final count result
    const result: { city: string; count: number }[] = [];
    cityGroup.forEach((cidSet, city) => {
        result.push({ city, count: cidSet.size });
    });

    return result;
}