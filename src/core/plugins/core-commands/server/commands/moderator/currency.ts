import alt from 'alt-server';
import { Athena } from '@AthenaServer/api/athena';
import { command } from '@AthenaServer/decorators/commands';
import { CurrencyTypes } from '@AthenaShared/enums/currency';
import { PERMISSIONS } from '@AthenaShared/flags/permissionFlags';

class CurrencyCommands {
    @command(['cash', 'setcash'], '/setcash [amount] [id]', PERMISSIONS.ADMIN)
    private static setCashCommand(player: alt.Player, amount: string, id: string | null = null): void {
        if (id === null || id === undefined) {
            Athena.player.currency.set(player, CurrencyTypes.CASH, parseInt(amount));
            return;
        }

        const target = Athena.systems.identifier.getPlayer(id);
        if (!target) {
            Athena.player.emit.message(player, 'Cannot Find Player');
            return;
        }

        Athena.player.currency.set(target, CurrencyTypes.CASH, parseInt(amount));
    }

    @command('addbank', '/addbank [amount] [id]', PERMISSIONS.ADMIN)
    private static addBankCommand(player: alt.Player, amount: string, id: string | null = null): void {
        if (id === null || id === undefined) {
            Athena.player.currency.set(player, CurrencyTypes.BANK, parseInt(amount));
            return;
        }

        const target = Athena.systems.identifier.getPlayer(id);
        if (!target) {
            Athena.player.emit.message(player, 'Cannot Find Player');
            return;
        }

        Athena.player.currency.add(target, CurrencyTypes.BANK, parseInt(amount));
    }

    @command('addcash', '/addcash [amount] [id]', PERMISSIONS.ADMIN)
    private static addCashCommand(player: alt.Player, amount: string, id: string | null = null): void {
        if (id === null || id === undefined) {
            Athena.player.currency.set(player, CurrencyTypes.CASH, parseInt(amount));
            return;
        }

        const target = Athena.systems.identifier.getPlayer(id);
        if (!target) {
            Athena.player.emit.message(player, 'Cannot Find Player');
            return;
        }

        Athena.player.currency.add(target, CurrencyTypes.CASH, parseInt(amount));
    }

    @command('setbank', '/setbank [amount] [id]', PERMISSIONS.ADMIN)
    private static setBankCommand(player: alt.Player, amount: string, id: string | null = null): void {
        if (id === null || id === undefined) {
            Athena.player.currency.set(player, CurrencyTypes.BANK, parseInt(amount));
            return;
        }

        const target = Athena.systems.identifier.getPlayer(id);
        if (!target) {
            Athena.player.emit.message(player, 'Cannot Find Player');
            return;
        }

        Athena.player.currency.set(target, CurrencyTypes.BANK, parseInt(amount));
    }
}
