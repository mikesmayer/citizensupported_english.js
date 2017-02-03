import m from 'mithril';
import _ from 'underscore';
import postgrest from 'mithril-postgrest';
import userVM from '../vms/user-vm';
import models from '../models';
import h from '../h';
import quickProjectList from '../c/quick-project-list';

const menuProfile = {
    controller(args) {
        const contributedProjects = m.prop(),
            latestProjects = m.prop([]),
            userDetails = m.prop({}),
            user_id = args.user.user_id;

        const userName = () => {
            const name = userDetails().name;
            if (name && !_.isEmpty(name)) {
                return _.first(name.split(' '));
            }

            return '';
        };

        userVM.fetchUser(user_id, true, userDetails);

        return {
            contributedProjects: contributedProjects,
            latestProjects: latestProjects,
            userDetails: userDetails,
            userName: userName,
            toggleMenu: h.toggleProp(false, true)
        };
    },
    view(ctrl, args) {
        const user = ctrl.userDetails();

        return m(`.w-dropdown.user-profile`,
            [
                m(`a.w-dropdown-toggle.dropdown-toggle[href='javascript:void()'][id='user-menu']`,
                    {
                        onclick: ctrl.toggleMenu.toggle
                    },
                    [
                        m('.user-name-menu', ctrl.userName()),
                        m(`img.user-avatar[alt='Thumbnail - ${user.name}'][height='40'][src='${h.useAvatarOrDefault(user.profile_img_thumbnail)}'][width='40']`)
                    ]
                ),
                ctrl.toggleMenu() ? m(`nav.w-dropdown-list.dropdown-list.user-menu.w--open[id='user-menu-dropdown']`, {style: 'display:block;'},
                        [
                            m(`.w-row`,
                                [
                                    m(`.w-col.w-col-12`,
                                        [
                                            m(`.fontweight-semibold.fontsize-smaller.u-marginbottom-10`,
                                                `My history`
                                            ),
                                            m(`ul.w-list-unstyled.u-marginbottom-20`,
                                                [
                                                    m(`li.lineheight-looser`,
                                                        m(`a.alt-link.fontsize-smaller[href='/users/${user.id}/edit#contributions']`,
                                                            `Support history`
                                                        )
                                                    ),
                                                    m(`li.lineheight-looser`,
                                                        m(`a.alt-link.fontsize-smaller[href='/users/${user.id}/edit#projects']`,
                                                            `Projects created`
                                                        )
                                                    ),
                                                    m(`li.w-hidden-main.w-hidden-medium.lineheight-looser`,
                                                        m(`a.alt-link.fontsize-smaller[href='/users/${user.id}/edit#projects']`,
                                                            `Projects created`
                                                        )
                                                    )
                                                ]
                                            ),
                                            m(`.fontweight-semibold.fontsize-smaller.u-marginbottom-10`,
                                                `Settings`
                                            ),
                                            m(`ul.w-list-unstyled.u-marginbottom-20`,
                                                [
                                                    m(`li.lineheight-looser`,
                                                        m(`a.alt-link.fontsize-smaller[href='/users/${user.id}/edit#about_me']`,
                                                            `About you`
                                                        )
                                                    ),
                                                    m(`li.lineheight-looser`,
                                                        m(`a.alt-link.fontsize-smaller[href='/users/${user.id}/edit#notifications']`,
                                                            `Notifications`
                                                        )
                                                    ),
                                                    m(`li.lineheight-looser`,
                                                        m(`a.alt-link.fontsize-smaller[href='/users/${user.id}/edit#settings']`,
                                                            `Information & address`
                                                        )
                                                    ),
                                                    m(`li.lineheight-looser`,
                                                        m(`a.alt-link.fontsize-smaller[href='/users/${user.id}/edit#billing']`,
                                                            `Bank & payment info`
                                                        )
                                                    )
                                                ]
                                            ),
                                            m('.divider.u-marginbottom-20'),
                                            args.user.is_admin_role ? m(`.fontweight-semibold.fontsize-smaller.u-marginbottom-10`,
                                                    `Admin`
                                                ) : '',
                                            args.user.is_admin_role ? m(`ul.w-list-unstyled.u-marginbottom-20`,
                                                    [
                                                        m(`li.lineheight-looser`,
                                                            m(`a.alt-link.fontsize-smaller[href='/new-admin#/users']`,
                                                                `Users`
                                                            )
                                                        ),
                                                        m(`li.lineheight-looser`,
                                                            m(`a.alt-link.fontsize-smaller[href='/new-admin']`,
                                                                `Support`
                                                            )
                                                        ),
                                                        m(`li.lineheight-looser`,
                                                            m(`a.alt-link.fontsize-smaller[href='/admin/financials']`,
                                                                `Financial relations`
                                                            )
                                                        ),
                                                        m(`li.lineheight-looser`,
                                                            m(`a.alt-link.fontsize-smaller[href='/admin/projects']`,
                                                                `Administer projects`
                                                            )
                                                        ),
                                                        m(`li.lineheight-looser`,
                                                            m(`a.alt-link.fontsize-smaller[href='/dbhero']`,
                                                                `Dataclips`
                                                            )
                                                        )
                                                    ]
                                                ) : '',
                                            m('.fontsize-mini', 'Your email address is: '),
                                            m('.fontsize-smallest.u-marginbottom-20', [
                                                m('span.fontweight-semibold',`${user.email} `),
                                                m(`a.alt-link[href='/users/${user.id}/edit#settings']`, 'change email')
                                            ]),
                                            m('.divider.u-marginbottom-20'),
                                            m(`a.alt-link[href='/logout']`,
                                                `Logout`
                                            )
                                        ]
                                    ),
                                    //m(`.w-col.w-col-4.w-hidden-small.w-hidden-tiny`,
                                    //    [
                                    //        m(`.fontweight-semibold.fontsize-smaller.u-marginbottom-10`,
                                    //            `Projects supported`
                                    //        ),
                                    //        m(`ul.w-list-unstyled.u-marginbottom-20`, ctrl.contributedProjects() ?
                                    //            _.isEmpty(ctrl.contributedProjects) ? 'No project.' :
                                    //            m.component(quickProjectList, {
                                    //                projects: m.prop(_.map(ctrl.contributedProjects(), (contribution) => {
                                    //                    return {
                                    //                        project_id: contribution.project_id,
                                    //                        project_user_id: contribution.project_user_id,
                                    //                        thumb_image: contribution.project_img,
                                    //                        video_cover_image: contribution.project_img,
                                    //                        permalink: contribution.permalink,
                                    //                        name: contribution.project_name
                                    //                    };
                                    //                })),
                                    //                loadMoreHref: '/users/${user.id}/edit#contributions',
                                    //                ref: 'user_menu_my_contributions'
                                    //            }) : 'loading...'
                                    //        )
                                    //    ]
                                    //),
                                    //m(`.w-col.w-col-4.w-hidden-small.w-hidden-tiny`,
                                    //    [
                                    //        m(`.fontweight-semibold.fontsize-smaller.u-marginbottom-10`,
                                    //            `Projects created`
                                    //        ),
                                    //        m(`ul.w-list-unstyled.u-marginbottom-20`, ctrl.latestProjects() ?
                                    //            _.isEmpty(ctrl.latestProjects) ? 'No project.' :
                                    //            m.component(quickProjectList, {
                                    //                projects: ctrl.latestProjects,
                                    //                loadMoreHref: '/users/${user.id}/edit#contributions',
                                    //                ref: 'user_menu_my_projects'
                                    //            }) : 'loading...'
                                    //        )
                                    //    ]
                                    //)
                                ]
                            )
                        ]
                    ) : ''
            ]
        );
    }
};

export default menuProfile;