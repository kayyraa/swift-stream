export function Save(Key, Value) {
    if (typeof Value === "object") {
        Value = JSON.stringify(Value);
    }
    localStorage.setItem(Key, Value);
}

export function Load(Key) {
    return localStorage.getItem(Key);
}