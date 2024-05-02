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