import m from 'mithril';
import _ from 'underscore';
import h from '../h';

const projectContributionReportContentCard = {
    controller(args) {
        const project = args.project(),
              stateClass = (state) => {
                  const classes = {
                      online: {
                          'paid': 'text-success.fa-circle',
                          'refunded': 'text-error.fa-circle',
                          'pending_refund': 'text-error.fa-circle',
                          'pending': 'text-waiting.fa-circle',
                          'refused': 'text-error.fa-circle'
                      },
                      failed: {
                          'paid': 'text-error.fa-circle-o',
                          'refunded': 'text-refunded.fa-circle',
                          'pending_refund': 'text-refunded.fa-circle-o',
                          'pending': 'text-refunded',
                          'refused': 'text-refunded'
                      },
                      waiting_funds: {
                          'paid': 'text-success.fa-circle',
                          'refunded': 'text-error.fa-circle',
                          'pending_refund': 'text-error.fa-circle',
                          'pending': 'text-waiting.fa-circle',
                          'refused': 'text-error.fa-circle'
                      },
                      successful: {
                          'paid': 'text-success.fa-circle',
                          'refunded': 'text-error.fa-circle',
                          'pending_refund': 'text-error.fa-circle',
                          'pending': 'text-waiting.fa-circle',
                          'refused': 'text-error.fa-circle'
                      }
                  };

                  return classes[project.state][state];
              };

        return {
            stateClass: stateClass
        };
    },
    view(ctrl, args) {
        let contribution = args.contribution(),
            profile_img = (_.isEmpty(contribution.profile_img_thumbnail) ? '/assets/catarse_bootstrap/user.jpg' : contribution.profile_img_thumbnail),
            reward = contribution.reward || {minimum_value: 0, description: 'No reward selected'};
        return m('.w-clearfix.card', [
            m('.w-row', [
                m('.w-col.w-col-1.w-col-tiny-1', [
                    m(`img.user-avatar.u-marginbottom-10[src='${profile_img}']`)
                ]),
                m('.w-col.w-col-11.w-col-tiny-11', [
                    m('.w-row', [
                        m('.w-col.w-col-3', [
                            m('.fontcolor-secondary.fontsize-mini.fontweight-semibold', h.momentify(contribution.created_at, 'DD/MM/YYYY, HH:mm')),
                            m('.fontweight-semibold.fontsize-smaller.lineheight-tighter', contribution.user_name),
                            m('.fontsize-smallest.lineheight-looser', [
                                (contribution.has_another ? [
                                    m('a.link-hidden-light.badge.badge-light', '+1 apoio '),
                                ] : ''),
                                (contribution.anonymous ? m('span.fa.fa-eye-slash.fontcolor-secondary', m('span.fontcolor-secondary[style="font-size:11px;"]', ' Non-public support')) : '')
                            ]),
                            m('.fontsize-smallest.lineheight-looser', (contribution.email))
                        ]),
                        m('.w-col.w-col-3', [
                            m('.lineheight-tighter', [
                                m(`span.fa.fontsize-smallest.${ctrl.stateClass(contribution.state)}`),
                                '   ',
                                m('span.fontsize-large', `R$ ${h.formatNumber(contribution.value, 2, 3)}`)
                            ])
                        ]),
                         m('.w-col.w-col-3.w-hidden-small.w-hidden-tiny', [
                             m('.fontsize-smallest.fontweight-semibold', `Reward: Rs ${h.formatNumber(reward.minimum_value, 2, 3)}`),
                             m('.fontsize-smallest', reward.description.substring(0, 80) + '...')
                         ])/*,
                        m(".w-col.w-col-2.w-hidden-small.w-hidden-tiny.u-text-center", [
                            m(".fontsize-smallest.fontcolor-secondary", "Enviei!"),
                            m(".fontsize-smallest.u-marginbottom-20.lineheight-loose", [
                                m("a.checkbox-big[href='#']", ".")
                            ])
                        ]),
                        m(".w-col.w-col-2", [
                            m(".fontsize-smallest", [
                                m("a.link-hidden[href='#']", "Questionário")
                                ," "
                                ,m("span.fontweight-semibold.text-waiting", "enviado")
                            ]),
                            m(".fontsize-smallest.fontcolor-terciary", "em 29/10/2015")
                        ])*/
                    ])
                ])
            ]),
            //m("a.w-inline-block.arrow-admin.fa.fa-chevron-down.fontcolor-secondary[data-ix='show-detail-box'][href='#']")
        ]);
    }
};

export default projectContributionReportContentCard;
