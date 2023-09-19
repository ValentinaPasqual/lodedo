PluginRegistry.add('route', {
    'url': '/autocomplete',
    'module': 'graphdb.framework.autocomplete',
    'path': 'autocomplete/app',
    'chunk': 'autocomplete',
    'controller': 'AutocompleteCtrl',
    'templateUrl': 'pages/autocomplete.html',
    'title': 'view.autocomplete.title',
    'helpInfo': 'view.autocomplete.helpInfo'
});

PluginRegistry.add('main.menu', {
    'items': [
        {label: 'Setup', labelKey: 'menu.setup.label', href: '#', order: 5, role: 'IS_AUTHENTICATED_FULLY', icon: "icon-settings", guideSelector: 'menu-setup'},
        {label: 'Autocomplete', labelKey: 'menu.autocomplete.label', href: 'autocomplete', order: 40, parent: 'Setup', role: "IS_AUTHENTICATED_FULLY", guideSelector: 'sub-menu-autocomplete'}
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/cluster',
        'module': 'graphdb.framework.clustermanagement',
        'chunk': 'clustermanagement',
        'path': 'clustermanagement/app',
        'controller': 'ClusterManagementCtrl',
        'templateUrl': 'pages/cluster-management/clusterInfo.html',
        'helpInfo': 'view.clusterManagement.helpInfo',
        'title': 'view.clusterManagement.title'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [{
        label: 'Cluster',
        labelKey: 'menu.cluster.label',
        href: 'cluster',
        order: 20,
        role: 'ROLE_ADMIN',
        parent: 'Setup',
        guideSelector: 'sub-menu-cluster'
    }]
});


PluginRegistry.add('route', [
    {
        'url': '/resource',
        'module': 'graphdb.framework.explore',
        'chunk': 'explore',
        'path': 'explore/app',
        'controller': 'ExploreCtrl',
        'templateUrl': 'pages/explore.html',
        'title': 'view.resource.title'
    }, {
        'url': '/resource/edit',
        'module': 'graphdb.framework.explore',
        'chunk': 'explore',
        'path': 'explore/app',
        'controller': 'EditResourceCtrl',
        'templateUrl': 'pages/edit.html',
        'title': 'view.resource.title'
    }, {
        'url': '/resource/:any*',
        'module': 'graphdb.framework.explore',
        'chunk': 'explore',
        'path': 'explore/app',
        'controller': 'ExploreCtrl',
        'templateUrl': 'pages/explore.html',
        'title': 'view.resource.title'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [{
        label: 'Explore',
        labelKey: 'menu.explore.label',
        href: '#',
        order: 1,
        role: 'IS_AUTHENTICATED_FULLY',
        icon: "icon-data",
        guideSelector: 'menu-explore'
    }]
});

PluginRegistry.add('route', {
    'url': '/graphs',
    'module': 'graphdb.framework.impex.export',
    'path': 'export/app',
    'chunk': 'export',
    'controller': 'ExportCtrl',
    'templateUrl': 'pages/export.html',
    'title': 'menu.graphs.overview.label',
    'helpInfo': 'view.export.ctr.helpInfo '
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Explore',
            labelKey: 'menu.explore.label',
            href: '#',
            order: 1,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-data',
            guideSelector: 'menu-explore'
        },
        {
            label: 'Graphs overview',
            labelKey: 'menu.graphs.overview.label',
            href: 'graphs',
            order: 0,
            role: 'IS_AUTHENTICATED_FULLY',
            parent: 'Explore',
            guideSelector: 'sub-menu-graph-overview'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/connectors',
    'module': 'graphdb.framework.externalsync',
    'path': 'externalsync/app',
    'chunk': 'externalsync',
    'controller': 'ConnectorsCtrl',
    'templateUrl': 'pages/connectorsInfo.html',
    'title': 'view.connector.management.title',
    'helpInfo': 'view.connector.management.helpInfo'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'Connectors',
            labelKey: 'menu.connectors.label',
            href: 'connectors',
            order: 10,
            parent: 'Setup',
            role: 'IS_AUTHENTICATED_FULLY',
            guideSelector: 'sub-menu-connectors'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/hierarchy',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'hierarchy',
        'controller': 'RdfClassHierarchyCtlr',
        'templateUrl': 'pages/rdfClassHierarchyInfo.html',
        'title': 'view.class.hierarchy.title',
        'reloadOnSearch': false,
        'helpInfo': 'view.class.hierarchy.helpInfo'
    }, {
        'url': '/domain-range-graph',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'domain-range-graph',
        'controller': 'DomainRangeGraphCtlr',
        'templateUrl': 'pages/domainRangeInfo.html',
        'title': 'view.domain.range.graph.title',
        'helpInfo': 'view.domain.range.graph.helpInfo'
    }, {
        'url': '/relationships',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'relationships',
        'controller': 'DependenciesChordCtrl',
        'templateUrl': 'pages/dependencies.html',
        'title': 'view.class.relationships.title',
        'helpInfo': 'view.class.relationships.helpInfo'
    }, {
        'url': '/graphs-visualizations',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'graphs-visualizations',
        'controller': 'GraphsVisualizationsCtrl',
        'templateUrl': 'pages/graphs-visualizations.html',
        'title': 'visual.graph.label',
        'reloadOnSearch': false,
        'helpInfo': 'view.visual.graph.helpInfo'
    }, {
        'url': '/graphs-visualizations/config/save/:configName?',
        'module': 'graphdb.framework.graphexplore',
        'path': 'graphexplore/app',
        'chunk': 'graph-config',
        'controller': 'GraphConfigCtrl',
        'templateUrl': 'pages/graph-config/saveGraphConfig.html',
        'title': 'view.create.visual.graph.title',
        'helpInfo': 'view.create.visual.graph.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Explore',
            labelKey: 'menu.explore.label',
            href: '#',
            order: 1,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-data',
            guideSelector: 'menu-explore'
        }, {
            label: 'Class relationships',
            labelKey: 'menu.class.relationships.label',
            href: 'relationships',
            order: 2,
            parent: 'Explore',
            guideSelector: 'sub-menu-class-relationships'
        }, {
            label: 'Class hierarchy',
            labelKey: 'menu.class.hierarchy.label',
            href: 'hierarchy',
            order: 1,
            parent: 'Explore',
            guideSelector: 'menu-class-hierarchy'
        }, {
            label: 'Visual graph',
            labelKey: 'visual.graph.label',
            href: 'graphs-visualizations',
            order: 5,
            parent: 'Explore',
            children: [{
                href: 'graphs-visualizations/config/save',
                children: []
            }],
            guideSelector: 'sub-menu-visual-graph'
        }
    ]
});

PluginRegistry.add('route', [
    {
        url: '/guides',
        module: 'graphdb.framework.guides',
        path: 'guides/app',
        templateUrl: 'pages/guides.html',
        title: 'view.guides.title',
        controller: 'GuidesCtrl',
        helpInfo: 'view.guides.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Guides',
            labelKey: 'menu.guides.label',
            order: 0,
            parent: 'Help',
            icon: 'paste',
            href: 'guides',
            role: 'ROLE_USER',
            guideSelector: 'sub-menu-guide'
        }
    ]
});

const reloadAndOpenInfoPanel = (services, clasInstanceSelector, resolve, reject) => {
    services.$location.url('/hierarchy');
    services.$route.reload();
    services.GuideUtils.waitFor(clasInstanceSelector, 3)
        .then(() => {
            services.GuideUtils.classHierarchyFocus(clasInstanceSelector);
            // Wait a little time animation to complete.
            services.GuideUtils.deferredShow(500)()
                .then(() => resolve());
        })
        .catch((error) => reject(error));
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'class-hierarchy',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'class-hierarchy';

            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'class-hierarchy',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class_hierarchy_intro.content',
                        url: '/hierarchy',
                        elementSelector: '#classChart',
                        placement: 'left'
                    }, options)
                }
            ];

            if (options.introExtraContent) {
                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: '',
                        extraContent: options.introExtraContent,
                        url: '/hierarchy',
                        elementSelector: '#classChart #main-group',
                        placement: 'left'
                    }, options)
                });
            }

            if (angular.isArray(options.zoomIris)) {
                options.zoomIris.forEach((zoomIri) => {
                    const selector = GuideUtils.getGuideElementSelector('class-' + zoomIri.iri);
                    steps.push({
                        guideBlockName: 'clickable-element',
                        options: angular.extend({}, {
                            content: 'guide.step_plugin.class_hierarchy_zoom.content',
                            url: '/hierarchy',
                            placement: 'left',
                            elementSelector: selector,
                            onNextClick: (guide, step) => {
                                GuideUtils.classHierarchyZoom(step.elementSelector);
                                guide.next();
                            }
                        }, options, zoomIri)
                    });
                    if (zoomIri.postExtraContent) {
                        steps.push({
                            guideBlockName: 'read-only-element',
                            options: angular.extend({}, {
                                content: '',
                                extraContent: zoomIri.postExtraContent,
                                url: '/hierarchy',
                                placement: 'left',
                                beforeShowPromise: GuideUtils.deferredShow(800),
                                elementSelector: selector
                            }, options)
                        });
                    }
                });
            }

            return steps;
        }
    },
    {
        guideBlockName: 'class-hierarchy-instances',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $location = services.$location;
            const $route = services.$route;
            options.title = 'guide.step_plugin.class-hierarchy-instances.title';
            const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
            const clasInstanceSelector = GuideUtils.getGuideElementSelector('class-' + options.iri);
            const steps = [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances.content',
                        url: '/hierarchy',
                        elementSelector: clasInstanceSelector,
                        onNextClick: (guide) => {
                            GuideUtils.classHierarchyFocus(clasInstanceSelector);
                            guide.next();
                        },
                        initPreviousStep: () => new Promise((resolve, reject) => {
                            if (!GuideUtils.isVisible(closeButtonSelector)) {
                                reloadAndOpenInfoPanel({$location, $route, GuideUtils}, clasInstanceSelector, resolve, reject);
                            } else {
                                resolve();
                            }
                        })
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-side-panel.content',
                        url: '/hierarchy',
                        elementSelector: '.rdf-info-side-panel div',
                        canBePaused: false,
                        placement: 'left',
                        beforeShowPromise: GuideUtils.deferredShow(800),
                        onPreviousClick: () => new Promise(function (resolve) {
                            GuideUtils.waitFor(closeButtonSelector, 1)
                                .then(() => $(closeButtonSelector).trigger('click'));
                            resolve();
                        })
                    }, options)
                }
            ];

            if (angular.isArray(options.focusInstances)) {
                options.focusInstances.forEach((focusInstance) => {
                    if (!angular.isObject(focusInstance)) {
                        focusInstance = {
                            instance: focusInstance
                        };
                    }
                    steps.push({
                        guideBlockName: 'read-only-element',
                        options: angular.extend({}, {
                            content: 'guide.step_plugin.class-hierarchy-instances-focus.content',
                            url: '/hierarchy',
                            canBePaused: false,
                            elementSelector: GuideUtils.getGuideElementSelector('instance-' + focusInstance.instance),
                            focusInstance: focusInstance.instance,
                            extraContent: focusInstance.message
                        }, options)
                    });
                });
            }

            const instanceCountSelector = GuideUtils.getGuideElementSelector('instances-count');
            if (options.followCountLink) {
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-count.content',
                        url: '/hierarchy',
                        canBePaused: false,
                        elementSelector: instanceCountSelector,
                        onNextClick: (guide, step) => {
                            GuideUtils.waitFor(step.elementSelector, 3)
                                .then(() => $(step.elementSelector).trigger('click'));
                            guide.next();
                        }
                    }, options)
                });

                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-query.content',
                        url: '/sparql',
                        elementSelector: GuideUtils.getSparqlEditorSelector(),
                        scrollToHandler: GuideUtils.scrollToTop
                    }, options)
                });
                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.class-hierarchy-instances-results.content',
                        extraContent: options.showExtraCommentSparql !== false ?
                            'guide.step_plugin.class-hierarchy-instances-results.extraContent' : null,
                        url: '/sparql',
                        placement: 'top',
                        elementSelector: GuideUtils.getSparqlResultsSelector(),
                        fileName: options.fileName,
                        scrollToHandler: GuideUtils.scrollToTop,
                        onNextClick: (guide) => {
                            window.history.back();
                            guide.next();
                        },
                        initPreviousStep: () => Promise.resolve()
                    }, options)
                });
            }

            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.class-hierarchy-instances-side-panel-close.content',
                    url: '/hierarchy',
                    canBePaused: false,
                    elementSelector: closeButtonSelector,
                    placement: 'left',
                    // If we followed the count link we come back here from another view
                    // and the side panel needs time to open
                    beforeShowPromise: options.followCountLink ? GuideUtils.deferredShow(1500) : Promise.resolve(),
                    advanceOn: {
                        selector: closeButtonSelector,
                        event: 'click'
                    },
                    onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3)
                        .then(() => $(closeButtonSelector).trigger('click')),
                    initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {

                        const currentStepId = services.ShepherdService.getCurrentStepId();
                        // If method is called from same step just click count link
                        if (currentStepId === stepId && options.followCountLink) {
                            GuideUtils.waitFor(instanceCountSelector, 3)
                                .then(() => {
                                    $(instanceCountSelector).trigger('click');
                                    GuideUtils.waitFor(GuideUtils.getSparqlResultsSelector(), 3)
                                        .then(() => {
                                            GuideUtils.deferredShow(50)()
                                                .then(() => resolve())
                                                .catch((error) => reject(error));
                                        })
                                        .catch((error) => reject(error));
                                    resolve();
                                })
                                .catch((error) => reject(error));
                        } else {
                            // If is called from other step we have to reload and open the info panel.
                            reloadAndOpenInfoPanel({$location, $route, GuideUtils}, clasInstanceSelector, resolve, reject);
                        }
                    })
                }, options)
            });

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'create-repository',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'create-repository';

            const repositoryIdInputSelector = GuideUtils.getGuideElementSelector('graphDBRepositoryIdInput');
            const repositoryId = options.repositoryId;
            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'repositories',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.create_repository_button.content',
                        url: '/repository',
                        elementSelector: GuideUtils.getGuideElementSelector('createRepository'),
                        onNextClick: (guide) => GuideUtils.clickOnGuideElement('createRepository')().then(() => guide.next())

                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.graph_db_repository.content',
                        url: '/repository/create',
                        elementSelector: GuideUtils.getGuideElementSelector('createGraphDBRepository'),
                        onNextClick: GuideUtils.clickOnGuideElement('createGraphDBRepository')
                    }, options)
                }, {
                    guideBlockName: 'input-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.repository_id.content',
                        url: '/repository/create/graphdb',
                        elementSelector: repositoryIdInputSelector,
                        onNextValidate: () => GuideUtils.validateTextInput(repositoryIdInputSelector, repositoryId)
                    }, options)
                }
            ];

            if (options.rulesetName) {
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.create_repository.ruleset_dropdown.content',
                        url: '/repository/create/graphdb',
                        elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryRulesetSelect'),
                        show: () => () => {
                            GuideUtils.validateTextInput(repositoryIdInputSelector, repositoryId);
                        },
                        rulesetName: options.rulesetName
                    }, options)
                });
            }
            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.create_repository.save_button.content',
                    url: '/repository/create/graphdb',
                    elementSelector: GuideUtils.getGuideElementSelector('graphDBRepositoryCrateButton'),
                    show: () => () => {
                        GuideUtils.validateTextInput(repositoryIdInputSelector, repositoryId);
                    },
                    onNextClick: GuideUtils.clickOnGuideElement('graphDBRepositoryCrateButton')
                }, options)
            });

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'download-guide-resource',
        getSteps: (options, services) => {
            return {
                guideBlockName: 'info-message',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.download-guide-resource.title',
                    content: 'guide.step_plugin.download-guide-resource.content',
                    canBePaused: true,
                    forceReload: true,
                    resourceUrl: services.GuideUtils.toResourceDownloadUrl(options)
                }, options)
            };
        }
    }]
);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'enable-autocomplete',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'enable-autocomplete';

            const autocompleteCheckboxSelector = GuideUtils.getGuideElementSelector('autocompleteCheckbox');
            return [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'autocomplete',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.enable-autocomplete.content',
                        url: '/autocomplete',
                        elementSelector: autocompleteCheckboxSelector,
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        show: (guide) => () => {
                            // Added listener to the element.
                            $(autocompleteCheckboxSelector)
                                .on('mouseup.autocompleteCheckboxClick', function () {
                                    // If autocomplete is enabled go to the next step.
                                    GuideUtils.deferredShow(20)()
                                        .then(() => {
                                            if (GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
                                                guide.next();
                                            }
                                        });
                                });
                        },
                        onNextClick: (guide) => {
                            if (!GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
                                $(autocompleteCheckboxSelector).trigger('click');
                            }
                            guide.next();
                        },
                        hide: () => () => {
                            // Remove ths listener from element. It is important when step is hided.
                            $(autocompleteCheckboxSelector).off('mouseup.autocompleteCheckboxClick');
                        }
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.enable-autocomplete.status_info.content',
                        url: '/autocomplete',
                        elementSelector: GuideUtils.getGuideElementSelector('autocompleteStatus'),
                        canBePaused: false
                    }, options)
                }
            ];
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'execute-sparql-query',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const toastr = services.toastr;
            const $translate = services.$translate;
            const $interpolate = services.$interpolate;
            const $location = services.$location;
            const $route = services.$route;
            options.mainAction = 'execute-sparql-query';

            const code = document.createElement('code');
            const copy = document.createElement('button');
            copy.className = 'btn btn-sm btn-secondary';
            copy.innerText = $translate.instant('guide.step_plugin.execute-sparql-query.copy-to-editor.button');
            copy.setAttribute('ng-click', 'copyQuery()');

            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'sparql',
                        showIntro: true
                    }, options)
                }
            ];

            const defaultQuery = 'select * where { \n\t?s ?p ?o .\n} limit 100 \n';
            const queries = {};
            queries[-1] = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nselect * where { \n\t?s ?p ?o .\n?o rdf:type ""\n} limit 100 ';

            let overwriteQuery = false;
            options.queries.forEach((queryDef, index) => {
                const query = queryDef.query;
                queries[index] = query;
                code.innerText = query;
                options.queryAsHtmlCodeElement = '<div class="shepherd-code">' + code.outerHTML + copy.outerHTML + '</div>';

                const queryEditorSelector = GuideUtils.getSparqlEditorSelector();
                steps.push({
                    guideBlockName: 'input-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.execute-sparql-query.query-editor.content',
                        url: '/sparql',
                        elementSelector: queryEditorSelector,
                        beforeShowPromise: () => new Promise(function (resolve, reject) {
                            GuideUtils.deferredShow(10)()
                                .then(() => {
                                    GuideUtils.waitFor(queryEditorSelector, 3)
                                        .then(() => resolve())
                                        .catch((error) => {
                                            services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                                            reject(error);
                                        });
                                });
                        }),
                        onNextValidate: () => {
                            const editorQuery = GuideUtils.removeWhiteSpaces(window.editor.getValue());
                            const stepQuery = GuideUtils.removeWhiteSpaces(query);
                            if (editorQuery !== stepQuery) {
                                if (editorQuery === 'select*where{?s?p?o.}limit100' || overwriteQuery) {
                                    // The query is the default query OR we previously overwrote it => we can overwrite it
                                    window.editor.setValue(query);
                                } else {
                                    GuideUtils.noNextErrorToast(toastr, $translate, $interpolate,
                                        'guide.step_plugin.execute-sparql-query.query-not-same.error', options);
                                    return false;
                                }
                            }
                            overwriteQuery = true;
                            return true;
                        },
                        initPreviousStep: () => new Promise((resolve, reject) => {
                            if (index === 0) {
                                window.editor.setValue(defaultQuery);
                                resolve();
                            } else {
                                const haveToReload = '/sparql' !== $location.url();
                                GuideUtils.executeSparqlQuery($location, $route, query, haveToReload)
                                    .then(() => resolve())
                                    .catch((error) => reject(error));
                            }
                        }),
                        scrollToHandler: GuideUtils.scrollToTop,
                        extraContent: queryDef.queryExtraContent,
                        onScope: (scope) => {
                            scope.copyQuery = () => {
                                window.editor.setValue(query);
                            };
                        }
                    }, options)
                });
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.execute-sparql-query.run-sparql-query.content',
                        url: '/sparql',
                        elementSelector: GuideUtils.getGuideElementSelector('runSparqlQuery'),
                        onNextClick: (guide) => GuideUtils.clickOnGuideElement('runSparqlQuery')().then(() => guide.next()),
                        scrollToHandler: GuideUtils.scrollToTop,
                        canBePaused: false,
                        initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            previousStep.options.initPreviousStep(services, previousStep.options.id)
                                .then(() => {
                                    const currentStepId = services.ShepherdService.getCurrentStepId();
                                    // Skip expanding of node if last step is "visual-graph-expand"
                                    if (currentStepId === stepId) {
                                        resolve();
                                    } else {
                                        GuideUtils.clickOnGuideElement('runSparqlQuery')().then(() => resolve()).catch((error) => reject(error));
                                    }
                                })
                                .catch((error) => reject(error));
                        })
                    }, options)
                });
                steps.push({
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.execute-sparql-query.result-explain.content',
                        url: '/sparql',
                        placement: 'top',
                        elementSelector: GuideUtils.getSparqlResultsSelector(),
                        fileName: options.fileName,
                        scrollToHandler: GuideUtils.scrollToTop,
                        extraContent: queryDef.resultExtraContent,
                        canBePaused: false,
                        initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                            if ('/sparql' !== $location.url()) {
                                GuideUtils.executeSparqlQuery($location, $route, query, true)
                                    .then(() => resolve())
                                    .catch((error) => reject(error));
                            } else {
                                const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                                previousStep.options.initPreviousStep(services, previousStep.options.id)
                                    .then(() => {
                                        window.editor.setValue(query);
                                        resolve();
                                    })
                                    .catch((error) => reject(error));
                            }
                        })
                    }, options)
                });
            });

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'import-rdf-file',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const toastr = services.toastr;
            const $translate = services.$translate;
            const $interpolate = services.$interpolate;
            options.mainAction = 'import-file';

            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'import',
                        showIntro: true
                    }, options)
                }
            ];

            if (options.resourcePath) {
                steps.push(
                    {
                        guideBlockName: 'download-guide-resource',
                        options: angular.extend({}, {
                            title: ''
                        }, options)
                    }
                );
            }

            const importSettingsButtonSelector = GuideUtils.getGuideElementSelector('import-settings-import-button');
            steps.push(...[
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.content',
                        url: '/import',
                        elementSelector: GuideUtils.getGuideElementSelector('uploadRdfFileButton'),
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        show: (guide) => () => {
                            // Add "change" listener to the file upload input, it will be triggered when a file is selected.
                            $('#ngf-wb-import-uploadFile')
                                .on('change.importRdfFile', function () {
                                    // Check if expected file is selected, then process to the next step.
                                    GuideUtils.waitFor(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile), 2)
                                        .then(() => guide.next());
                                });
                        },
                        hide: () => () => {
                            // Remove ths listener from element. It is important when step is hided.
                            $('#ngf-wb-import-uploadFile').off('change.importRdfFile');
                        },
                        onNextValidate: () => {
                            if (!$(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile)).length) {
                                GuideUtils.noNextErrorToast(toastr, $translate, $interpolate,
                                    'guide.step_plugin.import_rdf_file.file-must-be-uploaded', options);
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }, options)
                },
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.import-file.button.content',
                        elementSelector: GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile),
                        url: '/import',
                        placement: 'left',
                        onNextClick: () => GuideUtils.clickOnGuideElement('import-file-' + options.resourceFile)()
                    }, options)
                },
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.import-settings.import.button.content',
                        elementSelector: importSettingsButtonSelector,
                        placement: 'top',
                        onPreviousClick: () => new Promise(function (resolve) {
                            GuideUtils.clickOnGuideElement('import-settings-cancel-button')()
                                .then(() => resolve());
                        }),
                        beforeShowPromise: () => new Promise(function (resolve, reject) {
                            services.GuideUtils.deferredShow(300)()
                                .then(() => {
                                    services.GuideUtils.waitFor(importSettingsButtonSelector, 3)
                                        .then(() => {
                                            resolve();
                                        })
                                        .catch((error) => {
                                            services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                                            reject(error);
                                        });
                                });
                        }),
                        onNextClick: () => GuideUtils.clickOnGuideElement('import-settings-import-button')(),
                        canBePaused: false
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_status_info.content',
                        url: '/import',
                        elementSelector: GuideUtils.getGuideElementSelector('import-status-info'),
                        onPreviousClick: () => new Promise(function (resolve) {
                            GuideUtils.clickOnGuideElement('import-file-' + options.resourceFile)()
                                .then(() => resolve());
                        })
                    }, options)
                }
            ]);

            return steps;
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'click-main-menu',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const steps = [];

            let menuSelector;
            let menuTitle;
            let submenuSelector;
            let submenuTitle;
            let viewName;
            let helpInfo;

            switch (options.menu) {
                case "repositories":
                    menuSelector = 'menu-setup';
                    menuTitle = 'menu.setup.label';
                    submenuSelector = 'sub-menu-repositories';
                    submenuTitle = 'menu.repositories.label';
                    viewName = 'menu.repositories.label';
                    helpInfo = 'view.repositories.helpInfo';

                    break;
                case "import":
                    menuSelector = 'menu-import';
                    menuTitle = 'common.import';
                    viewName = 'common.import';
                    helpInfo = 'view.import.helpInfo';

                    break;
                case "autocomplete":
                    menuSelector = 'menu-setup';
                    menuTitle = 'menu.setup.label';
                    submenuSelector = 'sub-menu-autocomplete';
                    submenuTitle = 'menu.autocomplete.label';
                    viewName = 'view.autocomplete.title';
                    helpInfo = 'view.autocomplete.helpInfo';

                    break;
                case "visual-graph":
                    menuSelector = 'menu-explore';
                    menuTitle = 'menu.explore.label';
                    submenuSelector = 'sub-menu-visual-graph';
                    submenuTitle = 'visual.graph.label';
                    viewName = 'visual.graph.label';
                    helpInfo = 'view.visual.graph.helpInfo';

                    break;
                case "sparql":
                    menuSelector = 'menu-sparql';
                    menuTitle = 'menu.sparql.label';
                    viewName = 'view.sparql.title';
                    helpInfo = 'view.sparql.helpInfo';

                    break;
                case "class-hierarchy":
                    menuSelector = 'menu-explore';
                    menuTitle = 'menu.explore.label';
                    submenuSelector = 'menu-class-hierarchy';
                    submenuTitle = 'menu.class.hierarchy.label';
                    viewName = 'view.class.hierarchy.title';
                    helpInfo = 'view.class.hierarchy.helpInfo';

                    break;
            }

            const mainMenuClickElementPostSelector = submenuSelector ? ' div' : ' a';
            options.viewName = viewName;

            // View intro element
            if (options.showIntro && options.mainAction) {
                steps.push({
                    guideBlockName: 'info-message',
                    options: angular.extend({}, {
                        content: 'guide.step-intro.' + options.mainAction,
                        extraContent: helpInfo,
                        extraContentClass: 'alert alert-help text-left',
                        skipPoint: true
                    }, options)
                });
            }

            // Main menu element
            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step-menu.click-menu',
                    menuLabelKey: menuTitle,
                    elementSelector: GuideUtils.getGuideElementSelector(menuSelector),
                    showOn: () => {
                        // If submenu is visible this mean that we have to close menu.
                        if (!!submenuSelector && GuideUtils.isGuideElementVisible(submenuSelector)) {
                            GuideUtils.clickOnGuideElement(menuSelector, mainMenuClickElementPostSelector)();
                        }
                        return true;
                    },
                    onNextClick: (guide) =>
                        GuideUtils.clickOnGuideElement(menuSelector, mainMenuClickElementPostSelector)()
                            .then(() => {
                                if (!submenuSelector) {
                                    guide.next();
                                }
                            }),
                    initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                        const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                        if (previousStep) {
                            previousStep.options.initPreviousStep(services, previousStep.options.id)
                                .then(() => resolve())
                                .catch((error) => reject(error));
                        } else {
                            resolve();
                        }
                    })
                }, options)
            });

            if (submenuSelector) {
                steps.push({
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step-menu.click-menu',
                        menuLabelKey: submenuTitle,
                        elementSelector: GuideUtils.getGuideElementSelector(submenuSelector),
                        placement: 'right',
                        canBePaused: false,
                        showOn: () => {
                            // If submenu is visible this mean that we have to close menu.
                            if (!GuideUtils.isGuideElementVisible(submenuSelector)) {
                                GuideUtils.clickOnGuideElement(menuSelector, ' div')();
                            }
                            return true;
                        },
                        onNextClick: (guide) => GuideUtils.clickOnGuideElement(submenuSelector, ' a')().then(() => guide.next()),
                        initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            if (previousStep) {
                                previousStep.options.initPreviousStep(services, previousStep.options.id)
                                    .then(() => resolve())
                                    .catch((error) => reject(error));
                            } else {
                                resolve();
                            }
                        })
                    }, options)
                });
            }
            return steps;
        }
    }
]);

const getRepositoryName = (services, options) => {
    return services.$repositories.getRepositories().find((repo) => repo.id === options.repositoryId) ? options.repositoryId : options.repositoryIdBase;
};

const getRepositoryElementSelector = (services, options) => {
    return services.GuideUtils.getGuideElementSelector(`repository-${getRepositoryName(services, options)}-button`);
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'select-repository-dropdown',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            options.mainAction = 'select-repository';
            options.getRepositoryId = () => getRepositoryName(services, options);

            return [{
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    skipPoint: true,
                    content: 'guide.step_plugin.choose-repository.content',
                    elementSelector: GuideUtils.getGuideElementSelector('repositoriesGroupButton'),
                    onNextClick: (guide) => GuideUtils.clickOnGuideElement('repositoriesGroupButton')().then(() => guide.next())
                }, options)
            }, {
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.select-repository.content',
                    elementSelector: () => {
                        return getRepositoryElementSelector(services, options);
                    },
                    advanceOn: undefined,
                    beforeShowPromise: () => new Promise(function (resolve, reject) {
                        services.GuideUtils.waitFor(getRepositoryElementSelector(services, options), 1)
                            .then(() => resolve())
                            .catch((error) => {
                                services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                                reject(error);
                            });
                    }),
                    show: (guide) => () => {
                        $('#repositorySelectDropdown').addClass('autoCloseOff');
                        // Added listener to the element.
                        $(getRepositoryElementSelector(services, options))
                            .on('mouseup.selectRepositoryButtonClick', function () {
                                guide.next();
                            });
                    },
                    onNextClick: (guide) => {
                        $(getRepositoryElementSelector(services, options)).off('mouseup.selectRepositoryButtonClick');
                        $('#repositorySelectDropdown').removeClass('autoCloseOff');
                        GuideUtils.clickOnElement(getRepositoryElementSelector(services, options))().then(() => guide.next());
                    },
                    hide: () => () => {
                        $('#repositorySelectDropdown').removeClass('autoCloseOff');
                        // Remove ths listener from element. It is important when step is hided.
                        $(getRepositoryElementSelector(services, options)).off('mouseup.selectRepositoryButtonClick');
                    },
                    canBePaused: false
                }, options)
            }
            ];
        }
    },
    {
        guideBlockName: 'select-repository-plug',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            return [{
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    content: 'guide.step_plugin.select-repository-plug.content',
                    elementSelector: GuideUtils.getGuideElementSelector(`repository-${options.repositoryId}-plug`),
                    onNextClick: GuideUtils.getGuideElementSelector(`repository-${options.repositoryId}-plug`)
                }, options)
            }
            ];
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'table-graph-explore',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $location = services.$location;
            const $route = services.$route;
            options.mainAction = 'table-graph';

            const steps = [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step-intro.table-graph',
                        scrollToHandler: GuideUtils.scrollToTop,
                        elementSelector: GuideUtils.getSparqlResultsSelectorForIri(options.iri),
                        onNextClick: (guide, step) => {
                            GuideUtils.waitFor(step.elementSelector, 3)
                                .then(() => $(step.elementSelector).trigger('click'))
                                .then(() => guide.next());
                        },
                        initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                            const currentStepId = services.ShepherdService.getCurrentStepId();
                            if (currentStepId === stepId) {
                                resolve();
                            } else {
                                const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                                previousStep.options.initPreviousStep(services, previousStep.options.id)
                                    .then(() => {
                                        resolve();
                                    })
                                    .catch((error) => {
                                        reject(error);
                                    });
                            }
                        })
                    }, options)
                }, {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.table-graph-overview',
                        scrollToHandler: GuideUtils.scrollToTop,
                        elementSelector: GuideUtils.getSparqlResultsSelector() + ' tbody',
                        placement: 'top',
                        initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                            const currentStepId = services.ShepherdService.getCurrentStepId();
                            if (currentStepId === stepId) {
                                GuideUtils.defaultInitPreviousStep(services, stepId).then(() => resolve()).catch((error) => reject(error));
                            } else {
                                const url = `/resource?uri=${options.iri}&role=subject`;
                                if (url !== decodeURIComponent($location.url())) {
                                    $location.url(url);
                                    $route.reload();
                                    GuideUtils.waitFor(GuideUtils.getSparqlResultsSelector(' tbody'))
                                        .then(() => resolve())
                                        .catch((error) => reject(error));
                                } else {
                                    resolve();
                                }
                            }
                        })
                    }, options)
                }
            ];

            if (angular.isArray(options.subSteps)) {
                options.subSteps.forEach((subStep) => {

                    switch (subStep.type) {
                        case 'link':
                            steps.push({
                                guideBlockName: 'clickable-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.table-graph-link',
                                    elementSelector: GuideUtils.getSparqlResultsSelectorForIri(subStep.iri),
                                    onNextClick: (guide, step) => {
                                        GuideUtils.waitFor(step.elementSelector, 3)
                                            .then(() => $(step.elementSelector).trigger('click'))
                                            .then(() => guide.next());
                                    },
                                    initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                                        const linkUrl = `/resource?uri=${subStep.iri}&role=subject`;
                                        const tableGraphLinkUrl = `/resource?uri=${options.iri}&role=subject`;
                                        const url = decodeURIComponent($location.url());

                                        const currentStepId = services.ShepherdService.getCurrentStepId();

                                        if (currentStepId === stepId && tableGraphLinkUrl === url) {
                                            // this case is first link in the sequence before click the link, so we have to resolve it.
                                            resolve();
                                        } else if (currentStepId !== stepId && linkUrl === url) {
                                            // this case is first link in the sequence after click the link, so we have to call previous step.
                                            GuideUtils.defaultInitPreviousStep(services, stepId).then(() => resolve()).catch((error) => reject(error));
                                        } else {
                                            // this case is from second link we have to reload
                                            $location.url(linkUrl);
                                            $route.reload();
                                            GuideUtils.waitFor(GuideUtils.getSparqlResultsSelector(' tbody'))
                                                .then(() => resolve())
                                                .catch((error) => reject(error));
                                        }
                                    })
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'role':
                            steps.push({
                                guideBlockName: 'clickable-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.table-graph-role',
                                    elementSelector: GuideUtils.getGuideElementSelector('role-' + subStep.role),
                                    onNextClick: (guide, step) => {
                                        GuideUtils.waitFor(step.elementSelector, 3)
                                            .then(() => $(step.elementSelector).trigger('click'))
                                            .then(() => guide.next());
                                    },
                                    initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                                        const currentStepId = services.ShepherdService.getCurrentStepId();
                                        if (currentStepId === stepId) {
                                            resolve();
                                        } else {
                                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                                            previousStep.options.initPreviousStep(services, previousStep.options.id)
                                                .then(() => {
                                                    let url = $location.url();
                                                    url = url.substring(0, url.indexOf('role=') + 5);
                                                    url += subStep.role;
                                                    $location.url(url);
                                                    $route.reload();
                                                    GuideUtils.waitFor(GuideUtils.getSparqlResultsSelector(' tbody'))
                                                        .then(() => resolve())
                                                        .catch((error) => reject(error));
                                                })
                                                .catch((error) => {
                                                    reject(error);
                                                });
                                        }
                                    })
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'visual':
                            steps.push({
                                guideBlockName: 'clickable-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.table-graph-visual',
                                    elementSelector: GuideUtils.getGuideElementSelector('explore-visual'),
                                    onNextClick: (guide, step) => {
                                        GuideUtils.waitFor(step.elementSelector, 3)
                                            .then(() => $(step.elementSelector).trigger('click'));
                                    },
                                    initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                                        const currentStepId = services.ShepherdService.getCurrentStepId();

                                        if (currentStepId === stepId) {
                                            resolve();
                                        } else {
                                            GuideUtils.defaultInitPreviousStep(services, stepId).then(() => resolve()).catch((error) => reject(error));
                                        }
                                    })
                                }, angular.extend({}, options, subStep))
                            });
                            steps.push({
                                guideBlockName: 'read-only-element',
                                options: angular.extend({}, {
                                    content: 'guide.step_plugin.visual_graph_intro.content',
                                    extraContent: subStep.extraContentVisualIntro,
                                    url: '/graphs-visualizations',
                                    elementSelector: '.graph-visualization',
                                    placement: 'left',
                                    canBePaused: false,
                                    forceReload: true,
                                    onNextClick: (guide) => {
                                        window.history.back();
                                        guide.next();
                                    }
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'row':
                            steps.push({
                                guideBlockName: 'read-only-element',
                                options: angular.extend({}, {
                                    elementSelector: GuideUtils.getSparqlResultsSelectorForRow(subStep.row)
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                        case 'table':
                            steps.push({
                                guideBlockName: 'read-only-element',
                                options: angular.extend({}, {
                                    elementSelector: GuideUtils.getSparqlResultsSelector() + ' tbody'
                                }, angular.extend({}, options, subStep))
                            });
                            break;
                    }
                });
            }

            return steps;
        }
    }
]);

const disableAllNodes = () => () => {
    $('.node-wrapper').addClass('disable-visual-graph-node');
};

const enableAllNodes = () => () => {
    $('.node-wrapper').removeClass('disable-visual-graph-node');
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'visual-graph',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $location = services.$location;
            const $route = services.$route;
            options.mainAction = 'visual-graph';

            return [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'visual-graph',
                        showIntro: true
                    }, options)
                }, {
                    guideBlockName: 'input-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.visual_graph_input_IRI.content',
                        forceReload: true,
                        url: '/graphs-visualizations',
                        elementSelector: GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input'),
                        onNextValidate: (step) => GuideUtils.validateTextInput(step.elementSelector, step.easyGraphInputText)
                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.visual_graph_show_autocomplete.content',
                        url: '/graphs-visualizations',
                        elementSelector: GuideUtils.getGuideElementSelector(`autocomplete-${options.iri}`),
                        onNextClick: (guide, step) => GuideUtils.waitFor(step.elementSelector, 3).then(() => $(step.elementSelector).trigger('click')),
                        canBePaused: false,
                        forceReload: true
                    }, options)
                }, {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.visual_graph_intro.content',
                        url: '/graphs-visualizations',
                        elementSelector: '.graph-visualization',
                        placement: 'left',
                        onPreviousClick: () => new Promise(function (resolve, reject) {
                            $location.url('/graphs-visualizations');
                            $route.reload();
                            const searchInputSelector = GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input');
                            GuideUtils.waitFor(searchInputSelector, 3)
                                .then(() => {
                                    GuideUtils.validateTextInput(searchInputSelector, options.easyGraphInputText);
                                    resolve();
                                })
                                .catch((error) => reject(error));
                        }),
                        initPreviousStep: () => new Promise(function (resolve, reject) {
                            const url = '/graphs-visualizations?uri=' + options.iri;
                            if (url !== decodeURIComponent($location.url())) {
                                $location.url(url);
                                $route.reload();
                                GuideUtils.waitFor(`.node-wrapper[id^="${options.iri}"] circle`, 3)
                                    .then(() => resolve())
                                    .catch((error) => reject(error));
                            } else {
                                resolve();
                            }
                        }),
                        canBePaused: false,
                        forceReload: true
                    }, options)
                }
            ];
        }
    },
    {
        guideBlockName: 'visual-graph-expand',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const $route = services.$route;
            const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

            // Expands visual graph when a node is double-clicked.
            const dblClickFunction = (guide) => () => {
                GuideUtils.graphVizExpandNode(elementSelector);
                guide.getCurrentStep().hide();
                GuideUtils.awaitAlphaDropD3(null, $rootScope)()
                    .then(() => {
                        guide.next();
                    });
            };

            return [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-expand.title',
                        content: 'guide.step_plugin.visual-graph-expand.content',
                        url: '/graphs-visualizations',
                        canBePaused: false,
                        elementSelector,
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        onNextClick: (guide) => {
                            GuideUtils.graphVizExpandNode(elementSelector);
                            guide.getCurrentStep().hide();
                            GuideUtils.awaitAlphaDropD3(null, $rootScope)()
                                .then(() => {
                                    guide.next();
                                });
                        },
                        show: (guide) => () => {
                            // Add "dblclick" listener to the element. Processing of double-click event is disabled for the visual graph when guide is started.
                            // So we have expanded the graph manually when a selected node is double-clicked.
                            $(elementSelector).on('dblclick.onNodeDbClicked', dblClickFunction(guide));
                        },
                        hide: () => () => {
                            // Remove the "dblclick" listener of element. It is important when step is hided.
                            $(elementSelector).off('dblclick.onNodeDbClicked');
                        },
                        beforeShowPromise: () => new Promise(function (resolve, reject) {
                            $route.reload();
                            GuideUtils.deferredShow(50)()
                                .then(() => {
                                    GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope)()
                                        .then(() => resolve())
                                        .catch((error) => reject(error));
                                });
                        }),
                        initPreviousStep: (services, stepId) => new Promise(function (resolve, reject) {
                            const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                            previousStep.options.initPreviousStep(services, previousStep.id)
                                .then(() => {
                                    const currentStepId = services.ShepherdService.getCurrentStepId();
                                    // Skip expanding of node if last step is "visual-graph-expand"
                                    if (currentStepId === stepId) {
                                        resolve();
                                    } else {
                                        GuideUtils.graphVizExpandNode(elementSelector);
                                        GuideUtils.deferredShow(50)()
                                            .then(() => {
                                                GuideUtils.awaitAlphaDropD3(null, $rootScope)()
                                                    .then(() => resolve())
                                                    .catch((error) => reject(error));
                                            });
                                    }
                                })
                                .catch((error) => reject(error));
                        })
                    }, options)
                }
            ];
        }
    },
    {
        guideBlockName: 'visual-graph-properties',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;

            let mouseClickTimeStamp;
            let mouseEventTimer;

            // Expands Node info sidebar panel when a node is clicked.
            const onClick = (services, guide) => (event) => {
                if (mouseEventTimer) {
                    // Cancels expansion of the sidebar panel if user double-clicked.
                    if (event.timeStamp - mouseClickTimeStamp < 400) {
                        services.$timeout.cancel(mouseEventTimer);
                        mouseEventTimer = null;
                    }
                } else {
                    mouseClickTimeStamp = event.timeStamp;
                    mouseEventTimer = services.$timeout(function () {
                        GuideUtils.graphVizShowNodeInfo(elementSelector);
                        mouseEventTimer = null;
                        guide.next();
                    }, 500);
                }
            };

            const steps = [
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-properties.title',
                        content: 'guide.step_plugin.visual-graph-properties.content',
                        url: '/graphs-visualizations',
                        elementSelector,
                        canBePaused: false,
                        // Disable default behavior of service when element is clicked.
                        advanceOn: undefined,
                        show: (guide) => () => {
                            // Add "click" listener to the element. Processing of click event is disabled for the visual graph when guide is started.
                            // So we have to open side panel info manually when a selected node is clicked.
                            $(elementSelector).on('click.onNodeClicked', onClick(services, guide));
                        },
                        hide: () => () => {
                            // Remove the "click" listener of element. It is important when step is hided.
                            $(elementSelector).off('click.onNodeClicked');
                        },
                        onNextClick: (guide, step) => {
                            GuideUtils.graphVizShowNodeInfo(step.elementSelector);
                            guide.next();
                        },
                        beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope)
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-properties-side-panel.title',
                        content: 'guide.step_plugin.visual-graph-properties-side-panel.content',
                        url: '/graphs-visualizations',
                        elementSelector: '.rdf-side-panel-content',
                        canBePaused: false,
                        placement: 'left',
                        beforeShowPromise: GuideUtils.deferredShow(500),
                        onPreviousClick: () => new Promise(function (resolve) {
                            GuideUtils.waitFor(closeButtonSelector, 3)
                                .then(() => {
                                    $(closeButtonSelector).trigger('click');
                                    resolve();
                                }).catch(() => resolve());
                        })
                    }, options)
                }
            ];

            if (angular.isArray(options.focusProperties)) {
                options.focusProperties.forEach((focusProperty) => {
                    if (!angular.isObject(focusProperty)) {
                        focusProperty = {
                            property: focusProperty
                        };
                    }
                    const translationIdSuffix = focusProperty.property === 'types' ? '-types' : '-property';
                    const content = focusProperty.skipGenericMessage && focusProperty.message ?
                        null : 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.content';
                    steps.push({
                        guideBlockName: 'read-only-element',
                        options: angular.extend({}, {
                            title: 'guide.step_plugin.visual-graph-properties-focus' + translationIdSuffix + '.title',
                            content: content,
                            url: '/graphs-visualizations',
                            canBePaused: false,
                            placement: 'left',
                            elementSelector: GuideUtils.getGuideElementSelector('graph-visualization-node-info-' + focusProperty.property),
                            focusProperty: focusProperty.property,
                            extraContent: focusProperty.message
                        }, options)
                    });
                });
            }

            const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
            steps.push({
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.visual-graph-properties-side-panel-close.title',
                    content: 'guide.step_plugin.visual-graph-properties-side-panel-close.content',
                    url: '/graphs-visualizations',
                    canBePaused: false,
                    placement: 'left',
                    elementSelector: closeButtonSelector,
                    advanceOn: {
                        selector: closeButtonSelector,
                        event: 'click'
                    },
                    beforeShowPromise: () => new Promise(function (resolve) {
                        // We have to be sure that node info sidebar is open. It is needed when this step is loaded when next step "Previous"
                        // button is clicked.
                        GuideUtils.graphVizShowNodeInfo(elementSelector);
                        GuideUtils.deferredShow(500)()
                            .then(() => resolve());
                    }),
                    onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3).then(() => $(closeButtonSelector).trigger('click'))
                }, options)
            });

            return steps;
        }
    },
    {
        guideBlockName: 'visual-graph-link-focus',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const elementSelector = `.link-wrapper[id^="${options.fromIri}>${options.toIri}"]`;
            return [
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-link-focus.title',
                        content: 'guide.step_plugin.visual-graph-link-focus.content',
                        url: '/graphs-visualizations',
                        canBePaused: false,
                        extraPadding: 40,
                        elementSelector,
                        show: disableAllNodes,
                        hide: enableAllNodes,
                        beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope)
                    }, options)
                }
            ];
        }
    },
    {
        guideBlockName: 'visual-graph-node-focus',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const elementSelector = `.node-wrapper[id^="${options.iri}"] circle`;
            return [
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-node-focus.title',
                        content: 'guide.step_plugin.visual-graph-node-focus.content',
                        url: '/graphs-visualizations',
                        canBePaused: false,
                        extraPadding: 10,
                        elementSelector,
                        show: disableAllNodes,
                        hide: enableAllNodes,
                        beforeShowPromise: GuideUtils.awaitAlphaDropD3(elementSelector, $rootScope),
                        initPreviousStep: (services, stepId) => new Promise((resolve, reject) => {
                            if (GuideUtils.isVisible(elementSelector)) {
                                resolve();
                            } else {
                                const previousStep = services.ShepherdService.getPreviousStepFromHistory(stepId);
                                previousStep.options.initPreviousStep(services, previousStep.id)
                                    .then(() => resolve())
                                    .catch((error) => reject(error));
                            }
                        })
                    }, options)
                }
            ];
        }
    }
]);

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'welcome',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $translate = services.$translate;
            const $interpolate = services.$interpolate;

            return [
                {
                    guideBlockName: 'info-message',
                    options: {
                        title: 'guide.step_plugin.welcome.title',
                        content: 'guide.step_plugin.welcome.content',
                        infoIconHint: GuideUtils.translateLocalMessage($translate, $interpolate, 'guide.step_plugin.welcome.info-icon-hint', options),
                        mouseIconHint: GuideUtils.translateLocalMessage($translate, $interpolate, 'guide.step_plugin.welcome.mouse-icon-hint', options),
                        inputIconHint: GuideUtils.translateLocalMessage($translate, $interpolate, 'guide.step_plugin.welcome.input-icon-hint', options)
                    }
                },
                {
                    guideBlockName: 'info-message',
                    options: {
                        title: 'guide.step_plugin.welcome.title',
                        content: 'guide.step_plugin.welcome-what.content'
                    }
                }
            ];
        }
    }
]);


const BASIC_STEP = {
    title: '',
    content: '',
    elementSelector: undefined,
    placement: 'bottom',
    url: undefined,
    type: 'read-only-element',
    maxWaitTime: 3,
    canBePaused: true,
    onNextClick: undefined,
    onNextValidate: undefined,
    onPreviousClick: undefined,
    skipPoint: false
};

/**
 * This function will be called before show a step. Step will be shown after promise is resolve. It waits element of step to be visible on the page.
 * @param {*} services
 * @param {string} elementSelector
 * @param {number} maxWaitTime
 * @return {function(): *}
 */
const beforeShowPromise = (services, elementSelector, maxWaitTime) => {
    return () => {
        return services.GuideUtils.waitFor(elementSelector, maxWaitTime)
            .catch((error) => {
                // error is caught just to show notification in generic way.
                services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
                // throw the error, otherwise guide will continue with the next step.
                throw error;
            });
    };
};

PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'clickable-element',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'clickable'
            };

            const stepDescription = angular.extend({}, BASIC_STEP, {
                advanceOn: {
                    selector: options.elementSelector,
                    event: 'click'
                },
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);

            if (!stepDescription.beforeShowPromise) {
                stepDescription.beforeShowPromise = beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
            }
            return stepDescription;
        }
    },
    {
        guideBlockName: 'read-only-element',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'readonly'
            };
            const stepDescription = angular.extend({}, BASIC_STEP, {
                    initPreviousStep: services.GuideUtils.defaultInitPreviousStep
                },
                options, notOverridable);
            if (!stepDescription.beforeShowPromise) {
                stepDescription.beforeShowPromise = beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
            }
            return stepDescription;
        }
    },
    {
        guideBlockName: 'input-element',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'input'
            };
            const stepDescription = angular.extend({}, BASIC_STEP, {
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);
            if (!stepDescription.beforeShowPromise) {
                stepDescription.beforeShowPromise = beforeShowPromise(services, stepDescription.elementSelector, stepDescription.maxWaitTime);
            }
            return stepDescription;
        }
    },
    {
        guideBlockName: 'info-message',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'readonly'
            };
            return angular.extend({}, BASIC_STEP, {
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);
        }
    },
    {
        guideBlockName: 'guide-end',
        getStep: (options, services) => {
            const notOverridable = {
                type: 'readonly',
                title: 'guide.step_plugin.guide-ended.title',
                content: 'guide.step_plugin.guide-ended.content',
                show: (guide) => () => {
                    guide.options.confirmCancel = false;
                },
                hide: (guide) => () => {
                    guide.options.confirmCancel = true;
                }
            };
            return angular.extend({}, BASIC_STEP, {
                initPreviousStep: services.GuideUtils.defaultInitPreviousStep
            }, options, notOverridable);
        }
    }
]);

PluginRegistry.add('route', {
    'url': '/import',
    'module': 'graphdb.framework.impex.import',
    'path': 'import/app',
    'chunk': 'import',
    'controller': 'CommonCtrl',
    'templateUrl': 'pages/import.html',
    'title': 'common.import',
    'reloadOnSearch': false,
    'helpInfo': 'view.import.helpInfo'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Import',
            labelKey: 'common.import',
            href: 'import',
            order: 0,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-import',
            guideSelector: 'menu-import'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/jdbc',
        'module': 'graphdb.framework.jdbc',
        'path': 'jdbc/app',
        'chunk': 'jdbc',
        'controller': 'JdbcListCtrl',
        'templateUrl': 'pages/jdbc.html',
        'title': 'view.jdbc.title',
        'helpInfo': 'view.jdbc.helpInfo'
    },
    {
        'url': '/jdbc/configuration/create',
        'module': 'graphdb.framework.jdbc',
        'path': 'jdbc/app',
        'chunk': 'jdbc',
        'controller': 'JdbcCreateCtrl',
        'templateUrl': 'pages/jdbc-create.html',
        'title': 'view.jdbc.create.title',
        'helpInfo': 'view.jdbc.create.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {label: 'Setup', labelKey: 'menu.setup.label', href: '#', order: 5, role: 'IS_AUTHENTICATED_FULLY', icon: "icon-settings", guideSelector: 'menu-setup'},
        {label: 'JDBC', labelKey: 'menu.jdbc.label', href: 'jdbc', order: 50, parent: 'Setup', role: "IS_AUTHENTICATED_FULLY", guideSelector: 'sub-menu-jdbs'}
    ]
});

PluginRegistry.add('route', {
    'url': '/namespaces',
    'module': 'graphdb.framework.namespaces',
    'chunk': 'namespaces',
    'path': 'namespaces/app',
    'controller': 'NamespacesCtrl',
    'templateUrl': 'pages/namespaces.html',
    'title': 'menu.namespaces.label',
    'helpInfo': 'view.namespaces.helpInfo'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-settings",
            guideSelector: 'menu-setup'
        }, {
            label: 'Namespaces',
            labelKey: 'menu.namespaces.label',
            href: 'namespaces',
            order: 30,
            parent: 'Setup',
            guideSelector: 'sub-menu-namespaces'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/',
    'module': 'graphdb.workbench',
    'chunk': 'home',
    'path': 'controllers',
    'controller': 'homeCtrl',
    'templateUrl': 'pages/home.html'
});

PluginRegistry.add('route', {
    'url': '/plugins',
    'module': 'graphdb.framework.plugins',
    'path': 'plugins/app',
    'chunk': 'plugins',
    'controller': 'PluginsCtrl',
    'templateUrl': 'pages/plugins.html',
    'title': 'menu.plugins.label',
    'helpInfo': 'view.plugins.helpInfo'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-settings",
            guideSelector: 'menu-setup'
        },
        {
            label: 'Plugins',
            labelKey: 'menu.plugins.label',
            href: 'plugins',
            order: 25,
            parent: 'Setup',
            role: "IS_AUTHENTICATED_FULLY",
            guideSelector: 'sub-menu-plugins'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/monitor/queries',
    'module': 'graphdb.framework.jmx.queries',
    'path': 'queries/app',
    'chunk': 'monitor-queries',
    'controller': 'QueriesCtrl',
    'templateUrl': 'pages/monitor/queries.html',
    'title': 'view.query.and.update.monitoring.title',
    'helpInfo': 'view.query.and.update.monitoring.helpInfo'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Monitor',
            labelKey: 'menu.monitor.label',
            href: '#',
            order: 3,
            // Changed to role user as now users can monitor their own queries
            role: 'ROLE_USER',
            icon: 'icon-monitoring',
            guideSelector: 'menu-monitor'
        }, {
            label: 'Queries and Updates',
            labelKey: 'menu.queries.and.updates.label',
            href: 'monitor/queries',
            order: 1,
            parent: 'Monitor',
            guideSelector: 'sub-menu-queries-and-updates'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/rdfrank',
    'module': 'graphdb.framework.rdfrank',
    'path': 'rdfrank/app',
    'chunk': 'rdfrank',
    'controller': 'RDFRankCtrl',
    'templateUrl': 'pages/rdfrank.html',
    'title': 'view.rdf.rank.title',
    'helpInfo': 'view.rdf.rank.helpInfo'
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'RDF Rank',
            labelKey: 'view.rdf.rank.title',
            href: 'rdfrank',
            order: 45,
            parent: 'Setup',
            role: 'IS_AUTHENTICATED_FULLY',
            guideSelector: 'sub-menu-rdf-rank'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/repository',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'LocationsAndRepositoriesCtrl',
        'templateUrl': 'pages/repositories.html',
        'title': 'menu.repositories.label',
        'helpInfo': 'view.repositories.helpInfo'
    }, {
        'url': '/repository/create',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'ChooseRepositoryCtrl',
        'templateUrl': 'pages/choose-repository-type.html',
        'title': 'view.choose.repo.title'
    }, {
        'url': '/repository/create/:repositoryType',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'AddRepositoryCtrl',
        'templateUrl': 'pages/repository.html',
        'title': 'Create Repository'
    }, {
        'url': '/repository/edit/:repositoryId',
        'module': 'graphdb.framework.repositories',
        'path': 'repositories/app',
        'chunk': 'repositories',
        'controller': 'EditRepositoryCtrl',
        'templateUrl': 'pages/repository.html',
        'title': 'Edit Repository'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'Repositories',
            labelKey: 'menu.repositories.label',
            href: 'repository',
            order: 1,
            role: 'ROLE_REPO_MANAGER',
            parent: 'Setup',
            children: [{
                href: 'repository/create',
                children: []
            }],
            guideSelector: 'sub-menu-repositories'
        }
    ]
});

PluginRegistry.add('route', {
    'url': '/monitor/system',
    'module': 'graphdb.framework.jmx.resources',
    'path': 'resources/app',
    'chunk': 'resources',
    'controller': 'ResourcesCtrl',
    'templateUrl': 'pages/monitor/resources.html',
    'title': 'view.resource.monitoring.title',
    'helpInfo': 'view.resource.monitoring.helpInfo',
    'reloadOnSearch': false
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Monitor',
            labelKey: 'menu.monitor.label',
            href: '#',
            order: 3,
            role: 'ROLE_MONITORING',
            icon: 'icon-monitoring',
            guideSelector: 'menu-monitor'
        }, {
            label: 'Resources',
            labelKey: 'menu.resources.label',
            href: 'monitor/system',
            // Added role requirement here to assert that users cannot see Resources menu item
            role: 'ROLE_MONITORING',
            order: 2,
            parent: 'Monitor',
            guideSelector: 'sub-menu-resources'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/users',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'UsersCtrl',
        'templateUrl': 'js/angular/security/templates/users.html',
        'title': 'menu.users.and.access.label',
        'helpInfo': 'view.users.access.helpInfo'
    }, {
        'url': '/user/create',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'AddUserCtrl',
        'templateUrl': 'js/angular/security/templates/user.html',
        'title': 'Create new user'
    }, {
        'url': '/login',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'LoginCtrl',
        'templateUrl': 'pages/login.html',
        'title': 'view.login.title'
    }, {
        'url': '/user/:userId',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'EditUserCtrl',
        'templateUrl': 'js/angular/security/templates/user.html',
        'title': 'Edit user'
    }, {
        'url': '/settings',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'ChangeUserPasswordSettingsCtrl',
        'templateUrl': 'js/angular/security/templates/user.html',
        'title': 'view.settings.title'
    }, {
        'url': '/accessdenied',
        'templateUrl': 'pages/accessdenied.html',
        'title': 'view.access.denied.title'
    }, {
        'url': '/rolesmappings',
        'module': 'graphdb.framework.security',
        'path': 'security/app',
        'chunk': 'security',
        'controller': 'RolesMappingController',
        'templateUrl': 'js/angular/security/templates/roles.html',
        'title': 'view.roles.mapping.title'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        },
        {
            label: 'Users and Access', labelKey: 'menu.users.and.access.label', href: 'users', order: 2, parent: 'Setup', role: 'ROLE_ADMIN',
            children: [{
                href: 'user/create',
                children: []
            }],
            guideSelector: 'sub-menu-user-and-access'
        },
        {
            label: 'My Settings',
            labelKey: 'menu.my.settings.label',
            href: 'settings',
            order: 6,
            parent: 'Setup',
            role: 'ROLE_USER',
            guideSelector: 'sub-menu-my-settings'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/license/register',
        'module': 'graphdb.framework.settings',
        'path': 'settings/app',
        'chunk': 'settings',
        'controller': 'RegisterLicenseCtrl',
        'templateUrl': 'pages/registerLicenseInfo.html',
        'title': 'view.register.license.title',
        'helpInfo': 'view.register.license.helpInfo'
    }, {
        'url': '/license',
        'module': 'graphdb.framework.settings',
        'path': 'settings/app',
        'chunk': 'settings',
        'controller': 'LicenseCtrl',
        'templateUrl': 'pages/licenseInfo.html',
        'title': 'view.existing.license.title',
        'helpInfo': 'view.existing.license.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [{
        label: 'License',
        labelKey: 'menu.license.label',
        href: 'license',
        order: 100,
        role: 'ROLE_ADMIN',
        parent: 'Setup',
        guideSelector: 'sub-menu-license'
    }]
});

PluginRegistry.add('route', [
    {
        'url': '/similarity',
        'module': 'graphdb.framework.similarity',
        'path': 'similarity/app',
        'chunk': 'similarity',
        'controller': 'SimilarityCtrl',
        'templateUrl': 'pages/similarity-indexes.html',
        'title': 'view.similarity.indexes.title',
        'helpInfo': 'view.similarity.indexes.helpInfo'
    }, {
        'url': '/similarity/index/create',
        'module': 'graphdb.framework.similarity',
        'path': 'similarity/app',
        'chunk': 'similarity',
        'controller': 'CreateSimilarityIdxCtrl',
        'templateUrl': 'pages/create-index.html',
        'title': 'view.create.similarity.index.title',
        'helpInfo': 'view.create.similarity.index.helpInfo'
    }
]);

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 5,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'sub-menu-setup'
        },
        {
            label: 'Similarity',
            labelKey: 'menu.similarity.label',
            href: 'similarity',
            order: 40,
            parent: 'Explore',
            role: 'IS_AUTHENTICATED_FULLY',
            children: [{
                href: 'similarity/index/create',
                children: []
            }],
            guideSelector: 'sub-menu-similarity'
        }
    ]
});

PluginRegistry.add('route', [
    {
    'url': '/sparql-templates',
    'module': 'graphdb.framework.sparql-template',
    'path': 'sparql-template/app',
    'chunk': 'sparql-template',
    'controller': 'SparqlTemplatesCtrl',
    'templateUrl': 'pages/sparql-templates.html',
    'title': 'view.sparql.template.title',
    'helpInfo': 'view.sparql.template.helpInfo'
    },
    {
        'url': '/sparql-template/create',
        'module': 'graphdb.framework.sparql-template',
        'path': 'sparql-template/app',
        'chunk': 'sparql-template',
        'controller': 'SparqlTemplateCreateCtrl',
        'templateUrl': 'pages/sparql-template-create.html',
        'title': 'view.create.sparql.template.title',
        'helpInfo': 'view.create.sparql.template.helpInfo'
    }
    ]);

PluginRegistry.add('main.menu', {
    'items': [
        {label: 'Setup', labelKey: 'menu.setup.label', href: '#', order: 5, role: 'IS_AUTHENTICATED_FULLY', icon: "icon-settings", guideSelector: 'menu-setup'},
        {label: 'SPARQL Templates', labelKey: 'menu.sparql.template.label', href: 'sparql-templates', order: 51, parent: 'Setup', role: "IS_AUTHENTICATED_FULLY", guideSelector: 'sub-menu-sparql-templates'}
    ]
});

PluginRegistry.add('route', {
    'url': '/sparql',
    'module': 'graphdb.framework.sparql',
    'path': 'sparql/app',
    'chunk': 'sparql',
    'controller': 'QueryEditorCtrl',
    'templateUrl': 'pages/sparql.html',
    'title': 'view.sparql.title',
    'helpInfo': 'view.sparql.helpInfo',
    'reloadOnSearch': false,
});

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'SPARQL',
            labelKey: 'menu.sparql.label',
            href: 'sparql',
            order: 2,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: "icon-sparql",
            guideSelector: 'menu-sparql'
        }
    ]
});

PluginRegistry.add('route', [
    {
        'url': '/sysinfo',
        'module': 'graphdb.framework.stats',
        'path': 'stats/app',
        'chunk': 'stats',
        'controller': 'AdminInfoCtrl',
        'templateUrl': 'pages/info.html',
        'title': 'view.system.information.title',
        'helpInfo': 'view.system.information.helpInfo'
    }, {
        'url': '/webapi',
        'templateUrl': 'pages/webapi.html',
        'title': 'view.rest.api.documentation.title',
        'helpInfo': 'view.rest.api.documentation.helpInfo'
    }
]);

const DOCUMENTATION_URL = 'https://graphdb.ontotext.com/documentation/';

PluginRegistry.add('main.menu', {
    'items': [
        {
            label: 'Setup',
            labelKey: 'menu.setup.label',
            href: '#',
            order: 7,
            role: 'IS_AUTHENTICATED_FULLY',
            icon: 'icon-settings',
            guideSelector: 'menu-setup'
        }, {
            label: 'Help',
            labelKey: 'menu.help.label',
            href: '#',
            order: 8,
            icon: 'icon-help',
            guideSelector: 'menu-help'
        }, {
            label: 'System information',
            labelKey: 'menu.system.information.label',
            href: 'sysinfo',
            order: 50,
            parent: 'Help',
            role: 'ROLE_ADMIN',
            guideSelector: 'sub-menu-system-information'
        }, {
            label: 'REST API',
            labelKey: 'menu.rest.api.label',
            href: 'webapi',
            order: 1,
            parent: 'Help',
            guideSelector: 'sub-menu-rest-api'
        }, {
            label: 'Documentation',
            labelKey: 'menu.documentation.label',
            order: 2,
            parent: 'Help',
            icon: 'icon-external',
            hrefFun: function (productInfo) {
                return DOCUMENTATION_URL + productInfo.productShortVersion + '/';
            },
            guideSelector: 'sub-menu-documentation'
        }, {
            label: 'Tutorials',
            labelKey: 'menu.tutorials.label',
            order: 3,
            parent: 'Help',
            icon: 'icon-external',
            hrefFun: function (productInfo) {
                return DOCUMENTATION_URL + productInfo.productShortVersion + '/tutorials.html';
            },
            guideSelector: 'sub-menu-developer-hub'
        }, {
            label: 'Support',
            labelKey: 'menu.support.label',
            order: 4,
            parent: 'Help',
            icon: 'icon-external',
            hrefFun: function (productInfo) {
                return DOCUMENTATION_URL + productInfo.productShortVersion + '/support.html';
            },
            guideSelector: 'sub-menu-support'
        }
    ]
});
