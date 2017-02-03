import m from 'mithril';
import _ from 'underscore';
import h from '../h';

const SignedFriendFacebookConnect = {
    controller(args) {
        const mapWithAvatar = () => {
            return _.sample(_.filter(args.friendListVM.collection(), (item) => {
                return !_.isNull(item.avatar);
            }), 8);
        };

        return {
            mapWithAvatar: mapWithAvatar
        };
    },
    view(ctrl, args) {
        if (args.friendListVM.isLoading()) {
            return h.loader();
        } else {
            let total = args.friendListVM.total();
            return m('.w-section.section.bg-backs-carrosel.section-large', [
                m('.w-container', [
                    m('.card.card-big', [
                        m('.w-row', [
                            m('.w-col.w-col-8', [
                                m('.fontsize-largest.u-marginbottom-20', 'Find amazing projects with your friends'),
                                m('.fontsize-small', 'Using your Facebook network to explore Citizen Supported will help you discover incredible projects!')
                            ]),
                            m('.w-col.w-col-4.u-text-center', [
                                m('.fontsize-smallest.u-marginbottom-10', `${total} of your friends are on Citizen Supported!`),
                                m('.u-marginbottom-20', [
                                    _.map(ctrl.mapWithAvatar(), (item) => {
                                        return m(`img.thumb.small.u-round.u-marginbottom-10[src="${item.avatar}"]`);
                                    }),
                                ]),
                                (total > 0 ? m('a.w-button.btn.btn-large[href="/follow-fb-friends"]', 'Search for your friends') : m('a.w-button.btn.btn-fb.btn-large.u-margintop-30.u-marginbottom-10[href="/connect-facebook"]', 'Connect your facebook'))
                            ])
                        ])
                    ])
                ])
            ]);
        }
    }
};

export default SignedFriendFacebookConnect;