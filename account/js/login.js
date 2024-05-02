document.addEventListener("DOMContentLoaded", function() {
    const LoginButton = document.getElementById("login");
    const SignInButton = document.getElementById("signin");
    const SignOutButton = document.getElementById("signout");

    const LoginUsernameInput = document.getElementById("username");
    const LoginPasswordInput = document.getElementById("password");
    const SignInUsernameInput = document.getElementById("susername");
    const SignInPasswordInput = document.getElementById("spassword");

    const HomePage = "../../index.html";

    function LogIn(Username, Password, HomePage) {
        if (localStorage.getItem(Username) !== null && localStorage.getItem(Password) !== null) {
            window.open(HomePage, "_self")
            return true;
        } else {
            return false;
        }
    }

    function SignIn(Username, Password, HomePage) {
        if (localStorage.getItem(Username) === null && localStorage.getItem(Password) === null) {
            Save("username", Username);
            Save("password", Password);
            window.open(HomePage, "_self")
            return true;
        } else {
            return false;
        }
    }

    function Save(key, value) {
        localStorage.setItem(key, value);
    }

    if (LoginButton !== null && LoginPasswordInput !== null && LoginUsernameInput !== null) {
        LoginButton.addEventListener("click", function() {
            const Username = LoginUsernameInput.value
            const Password = LoginPasswordInput.value
            if (LogIn(Username, Password, HomePage) === true) {
                LogIn(Username, Password, HomePage)
            } else {
                console.log("SwiftStream - Failed To Log In");
            }
        });
    };

    if (SignInButton !== null && SignInPasswordInput !== null && SignInUsernameInput !== null) {
        SignInButton.addEventListener("click", function() {
            const Username = SignInUsernameInput.value
            const Password = SignInPasswordInput.value
            if (SignIn(Username, Password, HomePage) === true) {
                SignIn(Username, Password, HomePage)
            } else {
                console.log("SwiftStream - Failed To Sign In");
            }
        });
    };

    if (SignOutButton !== null) {
        SignOutButton.addEventListener("click", function() {
            const Username = localStorage.getItem("username")
            const Password = localStorage.getItem("password");
            if (LogIn(Username, Password, HomePage) === true) {
                SignIn(null, null, HomePage);
                window.open(HomePage, "_self")
            }
        });
    }
});