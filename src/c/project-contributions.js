import m from 'mithril';
import _ from 'underscore';
import postgrest from 'mithril-postgrest';
import models from '../models';
import h from '../h';
import projectDataTable from './project-data-table';
import projectDataChart from './project-data-chart';

const projectContributions = {
    controller(args) {
        const contributionsPerLocation = m.prop([]),
              contributionsPerDay = m.prop([]),
              listVM = postgrest.paginationVM(models.contributor),
              filterStats = postgrest.filtersVM({
                  project_id: 'eq'
              }),
              filterVM = postgrest.filtersVM({
                  project_id: 'eq'
              }),
              groupedCollection = (collection = []) => {
                  let grouped = [
                      []
                  ],
                      group = 0;

                  _.map(collection, (item, index) => {
                      if (grouped[group].length >= 3) {
                          group = group + 1;
                          grouped[group] = [];
                      }

                      grouped[group].push(item);
                  });

                  return grouped;
              },
              contributionsStats = m.prop({});

        filterVM.project_id(args.project().project_id);
        filterStats.project_id(args.project().project_id);

        if (!listVM.collection().length) {
            listVM.firstPage(filterVM.parameters());
        }
        //TODO: Abstract table fetch and contruction logic to contributions-vm to avoid insights.js duplicated code.
        const lContributionsPerDay = postgrest.loader(models.projectContributionsPerDay.getRowOptions(filterStats.parameters()));
        lContributionsPerDay.load().then(contributionsPerDay);

        let contributionsPerLocationTable = [
            ['state', 'Backed', '$ backed (% Of total)']
        ];
        const buildPerLocationTable = (contributions) => {
            return (!_.isEmpty(contributions)) ? _.map(_.first(contributions).source, (contribution) => {
                let column = [];

                column.push(contribution.state_acronym || 'Outro/other');
                column.push(contribution.total_contributions);
                column.push([contribution.total_contributed, [//Adding row with custom comparator => read project-data-table description
                    m(`input[type="hidden"][value="${contribution.total_contributed}"`),
                    '$ ',
                    h.formatNumber(contribution.total_contributed, 2, 3),
                    m('span.w-hidden-small.w-hidden-tiny', ' (' + contribution.total_on_percentage.toFixed(2) + '%)')
                ]]);
                return contributionsPerLocationTable.push(column);
            }) : [];
        };

        const lContributionsPerLocation = postgrest.loader(models.projectContributionsPerLocation.getRowOptions(filterStats.parameters()));
        lContributionsPerLocation.load().then(buildPerLocationTable);

        const lContributionsStats = postgrest.loader(models.projectContributiorsStat.getRowOptions(filterStats.parameters()));
        lContributionsStats.load().then(data => contributionsStats(_.first(data)));

        return {
            listVM: listVM,
            filterVM: filterVM,
            groupedCollection: groupedCollection,
            lContributionsStats: lContributionsStats,
            contributionsPerLocationTable: contributionsPerLocationTable,
            lContributionsPerLocation: lContributionsPerLocation,
            contributionsPerDay: contributionsPerDay,
            lContributionsPerDay: lContributionsPerDay,
            contributionsStats: contributionsStats
        };
    },
    view(ctrl, args) {
        const list = ctrl.listVM,
              stats = ctrl.contributionsStats(),
              groupedCollection = ctrl.groupedCollection(list.collection());

        return m('#project_contributions', m('#contributions_top', [
            m('.section.w-section',
              m('.w-container',
                m('.w-row', ctrl.lContributionsStats() ? h.loader() : !_.isEmpty(stats) ? [
                    m('.u-marginbottom-20.u-text-center-small-only.w-col.w-col-6', [
                        m('.fontsize-megajumbo',
                          stats.total
                         ),
                        m('.fontsize-large',
                          'People support this project'
                         )
                    ]),
                    m('.w-col.w-col-6',
                      m('.card.card-terciary.u-radius',
                        m('.w-row', [
                            m('.u-marginbottom-20.w-col.w-col-6.w-col-small-6', [
                                m('.fontweight-semibold.u-marginbottom-10',
                                  'New supporters'
                                 ),
                                m('.fontsize-largest.u-marginbottom-10',
                                  `${Math.floor(stats.new_percent)}%`
                                 ),
                                m('.fontsize-smallest',
                                  'Supporters who had never supported a project in Citizen Supported'
                                 )
                            ]),
                            m('.w-col.w-col-6.w-col-small-6', [
                                m('.divider.u-marginbottom-20.w-hidden-main.w-hidden-medium.w-hidden-small'),
                                m('.fontweight-semibold.u-marginbottom-10',
                                  'Recurring supporters'
                                 ),
                                m('.fontsize-largest.u-marginbottom-10',
                                  `${Math.ceil(stats.returning_percent)}%`
                                 ),
                                m('.fontsize-smallest',
                                  'Supporters who had already supported a project in Citizen Supported'
                                 )
                            ])
                        ])
                       )
                     )
                ] : '')
               )
             ),
            m('.divider.w-section'),
            m('.section.w-section', m('.w-container', [
                m('.fontsize-large.fontweight-semibold.u-marginbottom-40.u-text-center', 'Supporters'),
                m('.project-contributions.w-clearfix', _.map(groupedCollection, (group, idx) => m('.w-row', _.map(group, (contribution) => {
                    return m('.project-contribution-item.w-col.w-col-4', [
                        // here new card
                        m('.card.card-backer.u-marginbottom-20.u-radius.u-text-center', [
                            m('a[href="/users/' + contribution.user_id + '"][style="display: block;"]', {
                                onclick: h.analytics.event({
                                    cat: 'project_view',
                                    act: 'project_backer_link',
                                    lbl: contribution.user_id,
                                    project: args.project()
                                })
                            }, [
                                m('img.thumb.u-marginbottom-10.u-round[src="' + (!_.isEmpty(contribution.data.profile_img_thumbnail) ? contribution.data.profile_img_thumbnail : '/assets/catarse_bootstrap/user.jpg') + '"]')
                            ]),
                            m('a.fontsize-base.fontweight-semibold.lineheigh-tight.link-hidden-dark[href="/users/' + contribution.user_id + '"]', {
                                onclick: h.analytics.event({
                                    cat: 'project_view',
                                    act: 'project_backer_link',
                                    lbl: contribution.user_id,
                                    project: args.project()
                                })
                            }, contribution.data.name),
                            m('.fontcolor-secondary.fontsize-smallest.u-marginbottom-10', `${contribution.data.city},${contribution.data.state}`),
                            m('.fontsize-smaller', [
                                m('span.fontweight-semibold', contribution.data.total_contributed_projects),' Backed  |  ',
                                m('span.fontweight-semibold', contribution.data.total_published_projects),' Created'
                            ]),
                            //m('.btn-bottom-card.w-row', [
                            //    m('.w-col.w-col-3.w-col-small-4.w-col-tiny-3'),
                            //    m('.w-col.w-col-6.w-col-small-4.w-col-tiny-6', [
                            //        m("a.btn.btn-medium.w-button[href='#']", "Seguindo")
                            //    ]),
                            //    m(".w-col.w-col-3.w-col-small-4.w-col-tiny-3")
                            //])
                        ])
                        // new card
                    ]);
                })))),
                m('.w-row.u-marginbottom-40.u-margintop-20', [
                    m('.w-col.w-col-2.w-col-push-5', [!list.isLoading() ?
                                                      list.isLastPage() ? '' : m('button#load-more.btn.btn-medium.btn-terciary', {
                                                          onclick: list.nextPage
                                                      }, 'Load more') : h.loader(),
                                                     ])
                ])
            ]))
        ]),
                 m('.before-footer.bg-gray.section.w-section', m('.w-container', [
                     m('.w-row.u-marginbottom-60', [
                         m('.w-col.w-col-12.u-text-center', {
                             style: {
                                 'min-height': '300px'
                             }
                         }, [!ctrl.lContributionsPerDay() ? m.component(projectDataChart, {
                             collection: ctrl.contributionsPerDay,
                             label: '$ Collected per day',
                             dataKey: 'total_amount',
                             xAxis: (item) => h.momentify(item.paid_at),
                             emptyState: 'Unaccounted support'
                         }) : h.loader()]),
                     ]),
                     m('.w-row',
                       m('.w-col.w-col-12.u-text-center', [
                           m('.fontweight-semibold.u-marginbottom-10.fontsize-large.u-text-center', 'Where does the support come from?'),
                           (!ctrl.lContributionsPerLocation() ? !_.isEmpty(_.rest(ctrl.contributionsPerLocationTable)) ? m.component(projectDataTable, {
                               table: ctrl.contributionsPerLocationTable,
                               defaultSortIndex: -2
                           }) : '' : h.loader())
                       ])
                      )
                 ])));
    }
};

export default projectContributions;
