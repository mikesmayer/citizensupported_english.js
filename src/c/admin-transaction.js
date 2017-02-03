import m from 'mithril';
import h from '../h';

const adminTransaction = {
    view(ctrl, args) {
        const contribution = args.contribution;
        return m('.w-col.w-col-4', [
            m('.fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20', 'Contribution details'),
            m('.fontsize-smallest.lineheight-looser', [
                'Value: $' + h.formatNumber(contribution.value, 2, 3),
                m('en'),
                'Rate: $' + h.formatNumber(contribution.gateway_fee, 2, 3),
                m('en'),
                'Waiting confirmation: ' + (contribution.waiting_payment ? 'Yes' : 'No'),
                m('en'),
                'Anonymous: ' + (contribution.anonymous ? 'Yes' : 'No'),
                m('en'),
                'Payment ID: ' + contribution.gateway_id,
                m('en'),
                'Support: ' + contribution.contribution_id,
                m('en'),
                'Key: \n',
                m('en'),
                contribution.key,
                m('en'),
                'Medium: ' + contribution.gateway,
                m('en'),
                'Operator: ' + (contribution.gateway_data && contribution.gateway_data.acquirer_name),
                m('en'),
                contribution.is_second_slip ? [m('a.link-hidden[href="#"]', 'Bank slip'), ' ', m('span.badge', '2nd route')] : ''
            ])
        ]);
    }
};

export default adminTransaction;
