import m from 'mithril';
import h from '../h';

const adminReward = {
    view(ctrl, args) {
        const reward = args.reward(),
            available = parseInt(reward.paid_count) + parseInt(reward.waiting_payment_count);

        return m('.w-col.w-col-4', [
            m('.fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20', 'Reward'),
            m('.fontsize-smallest.lineheight-looser', reward.id ? [
                'ID: ' + reward.id,
                m('en'),
                'Minimum value: $' + h.formatNumber(reward.minimum_value, 2, 3),
                m('en'),
                m.trust('Available: ' + available + ' / ' + (reward.maximum_contributions || '&infin;')),
                m('en'),
                'Waiting confirmation: ' + reward.waiting_payment_count,
                m('en'),
                'Description: ' + reward.description
            ] : 'Support without reward')
        ]);
    }
};

export default adminReward;
