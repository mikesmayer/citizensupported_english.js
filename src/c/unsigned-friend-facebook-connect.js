import m from 'mithril';
import _ from 'underscore';
import h from '../h';

const UnsignedFriendFacebookConnect = {
    controller(args) {
        return {
            largeBg: (() => {
                if (_.isUndefined(args)) {
                    return false;
                } else {
                    return (_.isUndefined(args.largeBg) ? false : args.largeBg);
                }
            })()
        };
    },
    view(ctrl, args) {
        return m(`.w-section.section${(ctrl.largeBg ? '.bg-backs-carrosel.section-large' : '')}`, [
            m('.w-container', [
                m('.card.card-big', [
                    m('.w-row', [
                        m('.w-col.w-col-8', [
                            m('.fontsize-largest.u-marginbottom-20', 'Find amazing projects with your friends'),
                            m('.fontsize-small', 'Using your Facebook network to explore Citizen Supported will help you discover incredible projects!')
                        ]),
                        m('.w-col.w-col-4', [
                            m('a.w-button.btn.btn-fb.btn-large.u-margintop-30.u-marginbottom-10[href="/connect-facebook"]', 'Connect your facebook'),
                            m('.fontsize-smallest.fontcolor-secondary.u-text-center', 'We will never post anything on facebook without your permission')
                        ])
                    ])
                ])
            ])
        ]);
    }
};

export default UnsignedFriendFacebookConnect;
