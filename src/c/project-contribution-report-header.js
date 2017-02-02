import m from 'mithril';
import _ from 'underscore';
import FilterMain from '../c/filter-main';

const projectContributionReportHeader = {
    view(ctrl, args) {
        const filterBuilder = args.filterBuilder,
              paymentStateFilter =  _.findWhere(filterBuilder, {label: 'payment_state'}),
              rewardFilter = _.findWhere(filterBuilder, {label: 'reward_filter'}),
              mainFilter = _.findWhere(filterBuilder, {component: FilterMain}),
              project_id = args.filterVM.project_id();

        rewardFilter.data.options = args.mapRewardsToOptions();

        return m('.w-section.dashboard-header', [
            m('.w-container', [
                m('.w-row', [
                    m('.w-col.w-col-3'),
                    m('.w-col.w-col-6', [
                        m('.fontsize-larger.u-text-center.fontweight-semibold.lineheight-looser.u-marginbottom-30', 'Support report')]),
                    m('.w-col.w-col-3')
                ]),
                m('.w-form', [
                    m('form', {onsubmit: args.submit}, [
                        m('.w-row', [
                            m('.w-col.w-col-5', [
                                m('.w-row', [
                                    m.component(paymentStateFilter.component, paymentStateFilter.data),
                                        m.component(rewardFilter.component, rewardFilter.data)
                                ])
                            ]),
                            m('.w-col.w-col-7.u-margintop-20', [
                                m('.w-row', [
                                    m('.w-col.w-col-8._w-sub-col', [
                                        m.component(mainFilter.component, mainFilter.data)
                                    ]),
                                    m('.w-col.w-col-4.w-clearfix.w-hidden-small.w-hidden-tiny', [
                                        m(`a.alt-link.u-right.fontsize-small.lineheight-looser[href="/projects/${project_id}/download_reports"]`, [
                                            m('span.fa.fa-download', '.'),
                                            ' Download reports'
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ]);
    }
};

export default projectContributionReportHeader;
