import postgrest from 'mithril-postgrest';
import models from '../models';
import h from '../h';

const error = m.prop(''),
    rewards = m.prop([]),
    noReward = {
        id: -1,
        description: 'Thank you. I just want to help the project.',
        minimum_value: 10
    },
    contributionValue = m.prop(`${noReward.minimum_value},00`),
    selectedReward = m.prop(noReward),
    vm = postgrest.filtersVM({
        project_id: 'eq'
    });

const rewardsLoader = (project_id) => {
    vm.project_id(project_id);

    return postgrest.loaderWithToken(models.rewardDetail.getPageOptions(vm.parameters()));
};

const fetchRewards = (project_id) => {
    return rewardsLoader(project_id).load().then(rewards);
};

const getSelectedReward = () => {
    const root = document.getElementById('application'),
          data = root && root.getAttribute('data-contribution');

    if (data) {
        const contribution = JSON.parse(data);
        const reward = selectedReward(contribution.reward);

        m.redraw(true);

        return selectedReward;
    } else {
        return false;
    }
};

const selectReward = (reward) => () => {
    if (rewardVM.selectedReward() !== reward){
        rewardVM.selectedReward(reward);

        contributionValue(h.applyMonetaryMask(reward.minimum_value + ',00'));
    }
};

const applyMask = _.compose(contributionValue, h.applyMonetaryMask);

const rewardVM = {
    error: error,
    rewards: rewards,
    applyMask: applyMask,
    noReward: noReward,
    fetchRewards: fetchRewards,
    selectReward: selectReward,
    getSelectedReward: getSelectedReward,
    selectedReward: selectedReward,
    contributionValue: contributionValue,
    rewardsLoader: rewardsLoader,
    getValue: contributionValue,
    setValue: contributionValue
};

export default rewardVM;
