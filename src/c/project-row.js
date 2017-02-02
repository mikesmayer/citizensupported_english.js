import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import projectCard from './project-card';
import I18n from 'i18n-js';

const I18nScope = _.partial(h.i18nScope, 'projects');

const projectRow = {
    view(ctrl, args) {
        const collection = args.collection,
            title = args.title || collection.title,
            ref = args.ref,
            showFriends = args.showFriends,
            wrapper = args.wrapper || '.w-section.section.u-marginbottom-40';

        if (collection.loader() || collection.collection().length > 0) {
            return m(wrapper, [
                m('.w-container', [
                    (!_.isUndefined(collection.title) || !_.isUndefined(collection.hash)) ? m('.w-row.u-marginbottom-30', [
                        m((showFriends ? '.w-col.w-col-8.w-col-small-6.w-col-tiny-6' : '.w-col.w-col-10.w-col-small-6.w-col-tiny-6'), [
                            m('.fontsize-large.lineheight-looser', title)
                        ]),
                        m((showFriends ? '.w-col.w-col-4.w-col-small-6.w-col-tiny-6' : '.w-col.w-col-2.w-col-small-6.w-col-tiny-6'), [
                            m('.w-row', [
                                (showFriends ? m('.w-col.w-col-6', [
                                    m(`a.btn.btn-no-border.btn-small.btn-terciary[href="/connect-facebook?ref=${ref}"]`, 'Meet friends')
                                ]) : ''),
                                m((showFriends ? '.w-col.w-col-6' : '.w-col.w-col-12'),
                                    m(`a.btn.btn-small.btn-terciary[href="/explore?ref=${ref}&filter=${collection.hash}"]`,{
                                        config: m.route
                                    },I18n.t('home.see_all', I18nScope())))
                            ])
                        ])
                    ]) : '',
                    collection.loader() ? h.loader() : m('.w-row', _.map(collection.collection(), (project) => {
                        return m.component(projectCard, {
                            project: project,
                            ref: ref,
                            showFriends: showFriends
                        });
                    }))
                ])
            ]);
        } else {
            return m('div');
        }
    }
};

export default projectRow;
