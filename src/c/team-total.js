import m from 'mithril';
import h from '../h';
import models from '../models';

const teamTotal = {
    controller() {
        const vm = {
            collection: m.prop([])
        };

        models.teamTotal.getRow().then((data) => {
            vm.collection(data);
        });

        return {
            vm: vm
        };
    },
    view(ctrl, args) {
        return m('#team-total-static.w-section.section-one-column.section.u-margintop-40.u-text-center.u-marginbottom-20', [
            ctrl.vm.collection().map((teamTotal) => {
                return m('.w-container', [
                    m('.w-row', [
                        m('.w-col.w-col-2'),
                        m('.w-col.w-col-8', [
                            m('.fontsize-base.u-marginbottom-30',
                                'Today we are' + teamTotal.member_count + ' people scattered over ' + teamTotal.total_cities + ' cities and towns across the country! Our passion is to assist all of the amazing political activists that are leading the effort to pursue progressive change across the United States. Citizen Supported is independent, open-source and built with love.'),
                            m('.fontsize-larger.lineheight-tight.text-success',
                                'Our team, together, has already raised $' + h.formatNumber(teamTotal.total_amount) + ' for ' + teamTotal.total_contributed_projects + ' campaigns!')
                        ]),
                        m('.w-col.w-col-2')
                    ])
                ]);
            })
        ]);
    }
};

export default teamTotal;
