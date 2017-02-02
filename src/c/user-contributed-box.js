import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import contributionVM from '../vms/contribution-vm';
import loadMoreBtn from './load-more-btn';

const I18nScope = _.partial(h.i18nScope, 'payment.state');

const userContributedBox = {
    controller(args) {
        const setCsrfToken = (xhr) => {
            if (h.authenticityToken()) {
                xhr.setRequestHeader('X-CSRF-Token', h.authenticityToken());
            }
            return;
        };
        const toggleAnonymous = (projectId, contributionId) => {
            m.request({
                method: 'GET',
                config: setCsrfToken,
                url: `/projects/${projectId}/contributions/${contributionId}/toggle_anonymous`
            });
        };
        return {
            toggleAnonymous: toggleAnonymous
        };
    },
    view(ctrl, args) {
        let collection = args.collection,
            pagination = args.pagination,
            title = args.title;
        return (!_.isEmpty(collection) ? m('.section-one-column.u-marginbottom-30', [
            m('.fontsize-large.fontweight-semibold.u-marginbottom-30.u-text-center',
                title
            ),
            m('.w-row.w-hidden-small.w-hidden-tiny.card.card-secondary', [
                m('.w-col.w-col-3',
                    m('.fontsize-small.fontweight-semibold',
                        'Projects I supported'
                    )
                ),
                m('.w-col.w-col-2',
                    m('.fontsize-small.fontweight-semibold',
                        'Value of support'
                    )
                ),
                m('.w-col.w-col-3',
                    m('.fontsize-small.fontweight-semibold',
                        'Support Status'
                    )
                ),
                m('.w-col.w-col-4',
                    m('.fontsize-small.fontweight-semibold',
                        'Reward'
                    )
                )
            ]),

            _.map(collection, (contribution) => {
                return m('.w-row.card', [
                    m('.w-col.w-col-3',
                        m('.w-row', [
                            m('.w-col.w-col-4.u-marginbottom-10',
                                m(`a[href='/${contribution.permalink}']`,
                                    m(`img.thumb-project.u-radius[alt='${contribution.project_name}'][src='${contribution.project_image}'][width='50']`)
                                )
                            ),
                            m('.w-col.w-col-8',
                                m('.fontsize-small.fontweight-semibold',
                                    m(`a.alt-link[href='/${contribution.permalink}']`,
                                        contribution.project_name
                                    )
                                )
                            )
                        ])
                    ),
                    m('.w-col.w-col-2.u-marginbottom-10',
                        m('.fontsize-base.inline-block', [
                            m('span.w-hidden-main.w-hidden-medium.fontweight-semibold',
                                'Value of support'
                            ),
                            ` Rs ${contribution.value}`
                        ])
                    ),
                    m('.w-col.w-col-3.u-marginbottom-10', [
                        m('.w-hidden-main.w-hidden-medium.fontsize-smallest.fontweight-semibold',
                            'Status'
                        ),

                        m('.fontsize-smaller.fontweight-semibold', [
                            m('.lineheight-tighter'),
                            m(`span.fa.fa-circle.fontsize-smallest.${contribution.state == 'paid' ? 'text-success' : contribution.state == 'pending' ? 'text-waiting' : 'text-error'}`,
                                m.trust('&nbsp;')
                            ),
                            I18n.t(contribution.state, I18nScope({
                                date: h.momentify(contribution[contribution.state + '_at'])
                            }))
                        ]),
                        m('.fontsize-smallest',
                            (contribution.installments > 1 ? (`${contribution.installments} x R$ ${contribution.installment_value} `) : ''),
                            (contribution.payment_method == 'BoletoBancario' ? 'Boleto Bancário' : 'Cartão de Crédito')
                        ),

                        (contributionVM.canShowReceipt(contribution) ?
                            m(`a.btn.btn-inline.btn-small.u-margintop-10.btn-terciary[href='https://www.catarse.me/pt/projects/${contribution.project_id}/contributions/${contribution.contribution_id}/receipt'][target='__blank']`,
                                'View Receipt'
                            ) : ''),

                        (contributionVM.canShowSlip(contribution) ?
                            m(`a.btn.btn-inline.btn-small.u-margintop-10[href='${contribution.gateway_data['boleto_url']}'][target='__blank']`,
                                'Print Ticket'
                            ) : ''),

                        (contributionVM.canGenerateSlip(contribution) ?
                            m(`a.btn.btn-inline.btn-small.u-margintop-10[href='https://www.catarse.me/pt/projects/${contribution.project_id}/contributions/${contribution.contribution_id}/second_slip'][target='__blank']`,
                                'Generate 2nd via'
                            ) : ''),

                        m('.w-checkbox.fontsize-smallest.fontcolor-secondary.u-margintop-10', [
                            m(`input.w-checkbox-input[id='anonymous'][name='anonymous'][type='checkbox']${contribution.anonymous ? '[checked=\'checked\']' : ''}[value='1']`, {
                                onclick: () => ctrl.toggleAnonymous(contribution.project_id, contribution.contribution_id)
                            }),
                            m('label.w-form-label',
                                'I want my support not to be public'
                            )
                        ])
                    ]),
                    m('.w-col.w-col-4',
                        m('.fontsize-smallest', [
                            m('span.w-hidden-main.w-hidden-medium.fontweight-semibold',
                                'Reward'
                            ),
                            (contribution.reward_id ? m.trust(h.simpleFormat(contribution.reward_description)) : ' You have not selected a reward')

                        ]),

                        m('.fontsize-smallest.lineheight-looser', [
                            m('span.fontweight-semibold',
                                'Estimated delivery: '
                            ),
                            h.momentify(contribution.deliver_at, 'MMMM/YYYY')
                        ])
                    )
                ]);

            }),
            m('.w-row.u-marginbottom-40.u-margintop-30', [
                m(loadMoreBtn, {
                    collection: pagination,
                    cssClass: '.w-col-push-5'
                })
            ])
        ]) : m('div', ''));
    }
};

export default userContributedBox;
