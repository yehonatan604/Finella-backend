const REGEX_URL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const REGEX_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
const REGEX_HASHED_PASSWORD = /^[a-f0-9]{32}:[a-f0-9]{128}$/;
const REGEX_OBJECT_ID = /^[0-9a-fA-F]{24}$/
const REGEX_ISRAELI_DATE = /^(?:(?:31)|(?:0[1-9]|1\d|2[0-8])[-/.](0[1-9]|1[0-2]))[-/.](19|20)\d\d$|^(29[-/.]02[-/.](19|20)(0[48]|[2468][048]|[13579][26]))$/;

export {
    REGEX_EMAIL, REGEX_HASHED_PASSWORD, REGEX_ISRAELI_DATE, REGEX_OBJECT_ID, REGEX_PASSWORD, REGEX_URL
};

