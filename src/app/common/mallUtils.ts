import { Mall } from "./types";

export function groupAndCountCities(malls: Mall[]): { city: string; count: number }[] {
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

export function groupAndCountByMall(malls: Mall[]): { mall: string; count: number }[] {
    // Step 1: Filter out only those entries that have both 'cid' and 'mall' and mall is not empty
    const filteredMalls = malls.filter(mall => mall.cid && mall.mall && mall.mall.trim() !== "");

    // Step 2: Group by 'cid'
    const cidGroup = new Map<string, Mall[]>();
    filteredMalls.forEach(mall => {
        if (!cidGroup.has(mall.cid!)) {
            cidGroup.set(mall.cid!, []);
        }
        cidGroup.get(mall.cid!)!.push(mall);
    });

    // Step 3: Regroup by 'mall'
    const mallGroup = new Map<string, Set<string>>();
    cidGroup.forEach((value, key) => {
        value.forEach(mall => {
            if (!mallGroup.has(mall.mall!)) {
                mallGroup.set(mall.mall!, new Set());
            }
            mallGroup.get(mall.mall!)!.add(key);
        });
    });

    // Step 4: Prepare final count result
    const result: { mall: string; count: number }[] = [];
    mallGroup.forEach((cidSet, mall) => {
        result.push({ mall, count: cidSet.size });
    });

    return result;
}
