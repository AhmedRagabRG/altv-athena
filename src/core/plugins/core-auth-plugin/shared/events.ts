export const AUTH_REGISTER_EVENTS = {
    PAGE_NAME: 'Register',
    TO_CLIENT: {
        CLOSE: 'discord-login-close',
        OPEN: 'discord-login-open',
    },
    TO_SERVER: {
        TRY_FINISH: 'discord-login-try-finish',
    },
    TO_WEBVIEW: {
        SET_URI: 'discord-login-uri',
        SET_ERROR_MESSAGE: 'discord-set-error-message',
    },
};
