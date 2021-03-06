import m from 'mithril';
import h from '../../src/h';
import adminProjectDetailsCard from '../../src/c/admin-project-details-card';

describe('AdminProjectDetailsCard', () => {
    let generateController, ctrl, projectDetail, component, view, $output;

    describe('controller', () => {
        beforeAll(() => {
            generateController = (attrs) => {
                projectDetail = ProjectDetailsMockery(attrs)[0];
                component = m.component(adminProjectDetailsCard, {
                    resource: projectDetail
                });
                return component.controller();
            };
        });

        describe('project remaining time', () => {
            it('when remaining time is in days', () => {
                ctrl = generateController({
                    remaining_time: {
                        total: 10,
                        unit: 'days'
                    }
                });
                expect(ctrl.remainingTextObj.total).toEqual(10);
                expect(ctrl.remainingTextObj.unit).toEqual('days');
            });

            it('when remaining time is in seconds', () => {
                ctrl = generateController({
                    remaining_time: {
                        total: 12,
                        unit: 'seconds'
                    }
                });
                expect(ctrl.remainingTextObj.total).toEqual(12);
                expect(ctrl.remainingTextObj.unit).toEqual('seconds');
            });

            it('when remaining time is in hours', () => {
                ctrl = generateController({
                    remaining_time: {
                        total: 2,
                        unit: 'hours'
                    }
                });
                expect(ctrl.remainingTextObj.total).toEqual(2);
                expect(ctrl.remainingTextObj.unit).toEqual('hours');
            });
        });
    });

    describe('view', () => {
        beforeAll(() => {
            projectDetail = ProjectDetailsMockery()[0];
            component = m.component(adminProjectDetailsCard, {
                resource: projectDetail
            });
            ctrl = component.controller();
            view = component.view(ctrl, {
                resource: projectDetail
            });
            $output = mq(view);
        });

        it('should render details of the project in card', () => {
            let remaningTimeObj = ctrl.remainingTextObj;

            expect($output.find('.project-details-card').length).toEqual(1);
            expect($output.contains(projectDetail.total_contributions)).toEqual(true);
            expect($output.contains('$ ' + h.formatNumber(projectDetail.pledged, 2))).toEqual(true);
        });
    });
});
