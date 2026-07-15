function deepClone(value, map = new WeakMap()) {

    // Primitive values don't need cloning.
    if (value === null || typeof value !== "object") {
        return value;
    }

    // If already cloned, return the existing clone.
    if (map.has(value)) {
        return map.get(value);
    }

    // Create an empty array or object.
    const copy = Array.isArray(value) ? [] : {};

    // Store it before recursion (important for circular references).
    map.set(value, copy);

    // Clone each property recursively.
    for (let key in value) {
        copy[key] = deepClone(value[key], map);
    }

    return copy;
}