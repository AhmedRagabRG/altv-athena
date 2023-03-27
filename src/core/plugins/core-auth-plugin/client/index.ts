import * as alt from 'alt-client';
import { AthenaClient } from '../../../client/api/athena';
import { AUTH_REGISTER_EVENTS } from '../shared/events';


class RegisterView {

    static open() {
        alt.toggleGameControls(false);
        alt.Player.local.isMenuOpen = true;
        AthenaClient.webview.open([AUTH_REGISTER_EVENTS.PAGE_NAME], true);
        AthenaClient.webview.focus();
        AthenaClient.webview.showCursor(true);
    }

    static close() {
        AthenaClient.webview.close([AUTH_REGISTER_EVENTS.PAGE_NAME]);
        AthenaClient.webview.unfocus();
        AthenaClient.webview.showCursor(false);
        alt.toggleGameControls(true);
        alt.Player.local.isMenuOpen = false;
    }
}

alt.onServer(AUTH_REGISTER_EVENTS.TO_CLIENT.OPEN, RegisterView.open);
alt.onServer(AUTH_REGISTER_EVENTS.TO_CLIENT.CLOSE, RegisterView.close);
