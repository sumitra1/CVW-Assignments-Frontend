function isDeepEqual(obj1, obj2) {

    // Same value or same reference
    if (obj1 === obj2) {
        return true;
    }

    // If either is not an object (or is null), they can't be deeply equal
    if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null
    ) {
        return false;
    }

    // Get all keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Different number of keys
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Compare every key recursively
    for (let key of keys1) {

        if (!isDeepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}


console.log("Test 1 (Identical):", isDeepEqual(profileA, profileB)); // Expected: true
console.log("Test 2 (Different Roles):", isDeepEqual(profileA, profileC)); // Expected: false
console.log("Test 3 (Nested Change):", isDeepEqual(profileA, {...profileB, meta: { id: 2 } })); // Expected: false
console.log("Test 4 (Primitive):", isDeepEqual(10, 10)); // Expected: true