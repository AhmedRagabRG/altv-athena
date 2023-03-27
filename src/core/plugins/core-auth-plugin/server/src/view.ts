import * as alt from 'alt-server';
import { Athena } from '@AthenaServer/api/athena';
import { DevModeOverride } from '@AthenaServer/systems/dev';
import { AgendaSystem } from '@AthenaServer/systems/agenda';
import { AgendaOrder } from '@AthenaServer/systems/agenda';
import { AUTH_REGISTER_EVENTS } from '../../shared/events';
import { Account } from '@AthenaServer/interface/iAccount';
import { AccountSystem } from '@AthenaServer/systems/account';
import bcrypt from 'bcryptjs';
import { verify } from 'crypto';

const InternalFunctions = {
    async developerModeCallback(player: alt.Player) {
        const accounts = await Athena.database.funcs.fetchAllData<Account>(Athena.database.collections.Accounts);
        if (!accounts || typeof accounts[0] === 'undefined') {
            alt.logWarning(`Missing First Account...`);
            alt.logWarning(`Run the server at least once with 'npm run windows' before running dev mode.`);
            process.exit(1);
        }

        const account = accounts[0];
        await Athena.player.set.account(player, account);
    },

    hashPassword(password: string) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
};

export class LoginView {
    static init() {
        alt.onClient('Register:done', LoginView.done);
        AgendaSystem.set(AgendaOrder.LOGIN_SYSTEM, LoginView.show);
        DevModeOverride.setDevAccountCallback(InternalFunctions.developerModeCallback);
    }

    static async show(player: alt.Player) {
        alt.emitClient(player, AUTH_REGISTER_EVENTS.TO_CLIENT.OPEN);
    }

    // static async done(
    //     player: alt.Player,
    //     username: string,
    //     email: string,
    //     password: string,
    //     account: Partial<Account> = null,
    // ) {
    //     if (!player.valid) {
    //         return;
    //     }

    //     const data = await Athena.database.funcs.fetchAllByField<Account>('email', email, 'accounts');

    //     if (data.length > 0) {
    //         return;
    //     }

    //     const newUser: UserInfo = {
    //         username: username,
    //         email: email,
    //         password: InternalFunctions.hashPassword(password),
    //     };

    //     account = await AccountSystem.create(player, newUser);
    //     account._id = account._id.toString();

    //     if (newUser.username == '' || newUser.email == '' || newUser.password == '') {
    //         return;
    //     }
    
    //     alt.emitClient(player, AUTH_REGISTER_EVENTS.TO_CLIENT.CLOSE);
    
    //     const currentPlayers = [...alt.Player.all];
    
    //     if (account.banned) {
    //         player.kick(account.reason);
    //         return;
    //     }

    //     await Athena.player.set.account(player, account);
    //     Athena.systems.agenda.goNext(player);
    // }

    static async done(player: alt.Player, email: string, password: string) {
        let account = await Athena.database.funcs.fetchData<Account>(
            'email',
            email,
            Athena.database.collections.Accounts,
        );

        let verifyPassword = bcrypt.compareSync(password, account.password)

        if (!verifyPassword) {
            return;
        }

        alt.emitClient(player, AUTH_REGISTER_EVENTS.TO_CLIENT.CLOSE);

        if (account.banned) {
            player.kick(account.reason);
            return;
        }

        await Athena.player.set.account(player, account);
        Athena.systems.agenda.goNext(player);
    }
}
