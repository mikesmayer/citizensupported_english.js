import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import userFriends from  '../c/user-friends';
import userFollows from  '../c/user-follows';
import userFollowers from  '../c/user-followers';
import userCreators from  '../c/user-creators';

const FollowFoundFriends = {
    controller(args) {
        const user = h.getUser(),
              hash = m.prop(window.location.hash),
              displayTabContent = () => {
                  const c_opts = {
                      user: user
                  },
                  tabs = {
                            '#creators': m.component(userCreators, c_opts),
                            '#friends': m.component(userFriends, c_opts),
                            '#follows': m.component(userFollows, c_opts),
                            '#followers': m.component(userFollowers, c_opts)
                        };

                  hash(window.location.hash);

                  if (_.isEmpty(hash()) || hash() === '#_=_') {
                      return tabs['#friends'];
                  }

                  return tabs[hash()];
              };

        h.redrawHashChange();

        return {
            user: user,
            displayTabContent: displayTabContent
        };
    },
    view(ctrl, args) {
        return [
            m('.w-section.dashboard-header', [
                m('.w-container', [
                    m('.w-row.u-margintop-20.u-marginbottom-20', [
                        m('.w-col.w-col-1'),
                        m('.w-col.w-col-10.u-text-center', [
                            m('.fontsize-larger.fontweight-semibold.u-marginbottom-10', 'Discover projects with your friends'),
                            m('.fontsize-small', 'Follow your friends and we will notify you whenever they launch or support any project')
                        ]),
                        m('.w-col.w-col-1')
                    ])
                ])
            ]),
            [m('.divider.u-margintop-30'),
              m('.project-nav',
                m('.u-text-center.w-container',
                  [
                    m('a[id="creators-link"][class="dashboard-nav-link ' + (h.hashMatch('#creators') ? 'selected' : '') + '"] [href="#creators"]',
                      'Find filmmakers'
                     ),
                    m('a[id="friends-link"][class="dashboard-nav-link ' + (h.hashMatch('#friends') || h.hashMatch('') ? 'selected' : '') + '"] [href="#friends"]',
                      'Find friends'
                    ),
                    m('a[id="follows-link"][class="dashboard-nav-link ' + (h.hashMatch('#follows') ? 'selected' : '') + '"] [href="#follows"]',
                      [
                        'Following',
                        m.trust('&nbsp;'),
                        m('span.w-hidden-small.w-hidden-tiny.badge',
                          ctrl.user.follows_count
                        )
                      ]
                    ),
                    m('a[id="followers-link"][class="dashboard-nav-link ' + (h.hashMatch('#followers') ? 'selected' : '') + '"] [href="#followers"]',
                      [
                        'Followers',
                        m.trust('&nbsp;'),
                        m('span.w-hidden-small.w-hidden-tiny.badge',
                          ctrl.user.followers_count
                        )
                      ]
                    )
                  ]
                )
              )
            ],
            ctrl.displayTabContent()
        ];
    }
};

export default FollowFoundFriends;
