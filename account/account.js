const Links = document.querySelectorAll('[data-href]');
const AccountSection = document.getElementById("AccountSection");
const AccountUsernameSpan = document.getElementById("AccountName");
const AccountIdSpan = document.getElementById("AccountId");

const UsernameInput = document.getElementById("UsernameInput");
const PasswordInput = document.getElementById("PasswordInput");
const ConfirmButton = document.getElementById("ConfirmButton");

const UsernameInputLogin = document.getElementById("UsernameInputLogin");
const PasswordInputLogin = document.getElementById("PasswordInputLogin");
const ConfirmButtonLogin = document.getElementById("ConfirmButtonLogin");

const LogOutButton = document.getElementById("LogOutButton");
const DeleteAccountButton = document.getElementById("DeleteAccountButton");
const ClearHistoryButton = document.getElementById("ClearHistoryButton");
const ClearShortcutsButton = document.getElementById("ClearShortcutsButton");

Links.forEach(Element => {
    Element.addEventListener("click", function() {
        window.open(Element.dataset.href, "_self");
    });
});

function GenerateId(Length) {
    let Result = '';
    const Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const CharactersLength = Characters.length;
    let Counter = 0;
    while (Counter < Length) {
        Result += Characters.charAt(Math.floor(Math.random() * CharactersLength));
        Counter += 1;
    }
    return Result;
};

function GetAccount(ProtectedCall) {
    const Username = localStorage.getItem("USERNAME");
    if (Username !== null) {
        const Password = localStorage.getItem(`${Username}_PASSWORD`);
        const Id = localStorage.getItem(`${Username}_ID`);
        if (Password !== null) {
            return {
                Username: Username,
                Password: Password,
                Id: Id
            };
        } else if (Password === null && ProtectedCall === false) {
            throw new Error("Password Couldn't Be Found");
        } else if (Password === null && ProtectedCall === true) {
            console.log("Password Couldn't Be Found. ProtectedCall Allowed");
        };
    } else if (Username === null && ProtectedCall === false) {
        throw new Error("Username Couldn't Be Found");
    } else if (Username === null && ProtectedCall === true) {
        console.log("Username Couldn't Be Found. ProtectedCall Allowed");
        return {
            Username: null,
            Password: null,
            Id: null
        };
    };
};

function IsValidAccount(AccountName) {
    if (localStorage.getItem(AccountName) !== null) {
        true;
    } else {
        false;
    };
};

function CreateAccount(Username, Password) {
    localStorage.setItem("USERNAME", Username);
    localStorage.setItem(`${Username}_PASSWORD`, Password);
    localStorage.setItem(`${Username}_ID`, GenerateId(5));
    return {
        Username: GetAccount(true).Username,
        Password: GetAccount(true).Password,
        Id: GetAccount(true).Id
    };
};

if (GetAccount(true).Username !== null) {
    AccountIdSpan.innerHTML = `Id: #${GetAccount(true).Id}`;
    AccountUsernameSpan.innerHTML = `Username: ${GetAccount(true).Username}`;
} else {
    if (document.title == "Account - Manage") {
        window.open("./signup.html", "_self")
    };
};

if (UsernameInput !== null) {
    ConfirmButton.addEventListener("click", function() {
        CreateAccount(UsernameInput.value, PasswordInput.value);
        window.open("./manage.html", "_self");
    });
};

if (UsernameInputLogin !== null) {
    ConfirmButtonLogin.addEventListener("click", function() {
        if (IsValidAccount(UsernameInputLogin.value)) {
            if (GetAccount(true).Password === PasswordInputLogin.value) {
                window.open("./manage.html", "_self");
            } else {
                window.open("./signup.html", "_self");
            };
        };
    });
};

if (DeleteAccountButton !== null) {
    DeleteAccountButton.addEventListener("click", function () {
        localStorage.removeItem("USERNAME");
        localStorage.removeItem(`${GetAccount(true).Username}_PASSWORD`);
        localStorage.removeItem(`${GetAccount(true).Username}_ID`);
        localStorage.removeItem("History");
        window.open("../index.html", "_self");
    });
    LogOutButton.addEventListener("click", function() {
        localStorage.removeItem("USERNAME");
        localStorage.removeItem(`${GetAccount(true).Username}_PASSWORD`);
        localStorage.removeItem(`${GetAccount(true).Username}_ID`);
        localStorage.removeItem("History");
        window.open("../index.html", "_self");
    });
    ClearHistoryButton.addEventListener("click", function() {
        localStorage.setItem("History", null);
        window.open("../index.html", "_self");
    });
    ClearShortcutsButton.addEventListener("click", function() {
        for (let index = 0; index < localStorage.length; index++) {
            const Key = localStorage.key(index);
            if (Key.startsWith("sh_")) {
                localStorage.removeItem(Key);
            };
        };
        window.open("../index.html", "_self");
    });
};