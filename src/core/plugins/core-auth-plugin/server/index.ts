import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { LoginView } from './src/view';

const PLUGIN_NAME = 'AUTH REGISTER';

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    LoginView.init();

    alt.log(`~lg~CORE ==> ${PLUGIN_NAME} was Loaded`);
});
