/********************************************************************************
 * Copyright (C) 2021 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import { inject, injectable } from '@theia/core/shared/inversify';
import { CommonMenus } from '@theia/core/lib/browser/common-frontend-contribution';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { MenuContribution, MenuModelRegistry, MenuPath } from '@theia/core/lib/common/menu';
import { WindowService } from '@theia/core/lib/browser/window/window-service';

export namespace CraftStudioMenus {
    export const CRAFT_STUDIO_HELP: MenuPath = [...CommonMenus.HELP, 'theia-ide'];
}
export namespace CraftStudioCommands {
    export const CATEGORY = 'CraftStudio';
    export const REPORT_ISSUE: Command = {
        id: 'theia-ide:report-issue',
        category: CATEGORY,
        label: 'Report Issue'
    };
    export const DOCUMENTATION: Command = {
        id: 'theia-ide:documentation',
        category: CATEGORY,
        label: 'Documentation'
    };
}

@injectable()
export class CraftStudioContribution implements CommandContribution, MenuContribution {

    @inject(WindowService)
    protected readonly windowService: WindowService;

    static REPORT_ISSUE_URL = 'https://github.com/eclipse-theia/theia-ide/issues/new/choose';
    static DOCUMENTATION_URL = 'https://theia-ide.org/docs/user_getting_started/';

    registerCommands(commandRegistry: CommandRegistry): void {
        commandRegistry.registerCommand(CraftStudioCommands.REPORT_ISSUE, {
            execute: () => this.windowService.openNewWindow(CraftStudioContribution.REPORT_ISSUE_URL, { external: true })
        });
        commandRegistry.registerCommand(CraftStudioCommands.DOCUMENTATION, {
            execute: () => this.windowService.openNewWindow(CraftStudioContribution.DOCUMENTATION_URL, { external: true })
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CraftStudioMenus.CRAFT_STUDIO_HELP, {
            commandId: CraftStudioCommands.REPORT_ISSUE.id,
            label: CraftStudioCommands.REPORT_ISSUE.label,
            order: '1'
        });
        menus.registerMenuAction(CraftStudioMenus.CRAFT_STUDIO_HELP, {
            commandId: CraftStudioCommands.DOCUMENTATION.id,
            label: CraftStudioCommands.DOCUMENTATION.label,
            order: '2'
        });
    }
}
