export function Save(Key, Value) {
    if (typeof Value === "object") {
        Value = JSON.stringify(Value);
    }
    localStorage.setItem(Key, Value);
}

export function Load(Key) {
    return localStorage.getItem(Key);
}

export function LogIn(Username, Password, HomePage) {
    if (ds.Load(Username) !== null && ds.Load(Password) !== null) {
        window.open(HomePage, "_self")
        return true;
    } else {
        return false;
    }
}

export function SignIn(Username, Password, HomePage) {
    if (ds.Load(Username) === null && ds.Load(Password) === null) {
        ds.Save("username", Username);
        ds.Save("password", Password);
        window.open(HomePage, "_self")
        return true;
    } else {
        return false;
    }
}