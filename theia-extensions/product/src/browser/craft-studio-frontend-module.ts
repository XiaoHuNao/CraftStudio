/********************************************************************************
 * Copyright (C) 2020 TypeFox, EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import '../../src/browser/style/index.css';

import { WidgetFactory } from '@theia/core/lib/browser';
import { AboutDialog } from '@theia/core/lib/browser/about-dialog';
import { applyBranding } from './craft-studio-config';
import { CommandContribution } from '@theia/core/lib/common/command';
import { ContainerModule } from '@theia/core/shared/inversify';
import { GettingStartedWidget } from '@theia/getting-started/lib/browser/getting-started-widget';
import { MenuContribution } from '@theia/core/lib/common/menu';
import { CraftStudioAboutDialog } from './craft-studio-about-dialog';
import { CraftStudioContribution } from './craft-studio-contribution';
import { CraftStudioGettingStartedWidget } from './craft-studio-getting-started-widget';

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
    applyBranding();

    bind(CraftStudioGettingStartedWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => ({
        id: GettingStartedWidget.ID,
        createWidget: () => context.container.get<CraftStudioGettingStartedWidget>(CraftStudioGettingStartedWidget),
    })).inSingletonScope();
    if (isBound(AboutDialog)) {
        rebind(AboutDialog).to(CraftStudioAboutDialog).inSingletonScope();
    } else {
        bind(AboutDialog).to(CraftStudioAboutDialog).inSingletonScope();
    }

    bind(CraftStudioContribution).toSelf().inSingletonScope();
    [CommandContribution, MenuContribution].forEach(serviceIdentifier =>
        bind(serviceIdentifier).toService(CraftStudioContribution)
    );
});
