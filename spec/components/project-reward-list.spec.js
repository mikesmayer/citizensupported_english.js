import m from 'mithril';
import h from '../../src/h';
import projectRewardList from '../../src/c/project-reward-list';

describe('ProjectRewardList', () => {
    let generateContextByNewState;

    describe('view', () => {
        beforeAll(() => {
            generateContextByNewState = (newState = {}) => {
                spyOn(m, 'component').and.callThrough();
                let rewardDetail = RewardDetailsMockery(newState),
                    component = m.component(projectRewardList, {
                        project: m.prop({
                            id: 1231,
                            open_for_contributions: true
                        }),
                        rewardDetails: m.prop(rewardDetail)
                    });

                return {
                    output: mq(component),
                    rewardDetail: rewardDetail[0]
                };
            };
        });

        it('should render card-gone when reward sould out', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                maximum_contributions: 4,
                paid_count: 4
            });

            expect(output.find('.card-gone').length).toEqual(1);
            expect(output.contains('Out of stock')).toEqual(true);
        });

        it('should render card-reward when reward is not sould out', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                maximum_contributions: null
            });

            expect(output.find('.card-reward').length).toEqual(1);
            expect(output.contains('Out of stock')).toEqual(false);
        });

        it('should render card-reward stats when reward is limited and project is opened for contributions', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                maximum_contributions: 10,
                paid_count: 2,
                waiting_payment_count: 5
            });

            expect(output.find('.card-reward').length).toEqual(1);
            expect(output.contains('Limited')).toEqual(true);
            expect(output.contains('(3 out of 10 available)')).toEqual(true);
            expect(output.contains('2 contributions')).toEqual(true);
            expect(output.contains('5 contributions in confirmation period')).toEqual(true);
        });

        it('should render card-reward details', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                minimum_value: 20
            });

            expect(output.find('.card-reward').length).toEqual(1);
            expect(output.contains('For $ 20 or more')).toEqual(true);
            expect(output.contains('Estimated Delivery:')).toEqual(true);
            expect(output.contains(h.momentify(rewardDetail.deliver_at, 'MMM/YYYY'))).toEqual(true)
            expect(output.contains(rewardDetail.description)).toEqual(true);
        });

        it('should not render a contribution input value when reward is sold out', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                maximum_contributions: 4,
                paid_count: 4
            });

            output.click('.card-gone');
            expect(output.find('#contribution-submit').length).toEqual(0);

        });

        it('should render an input value when card reward is clicked', () => {
            let {
                output, rewardDetail
            } = generateContextByNewState({
                minimum_value: 20
            });

            output.click('.card-reward');

            expect(output.find('#contribution-submit').length).toEqual(0);
        });
    });
});
