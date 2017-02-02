import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import models from '../models';
import userBalanceTransactionRow from './user-balance-transaction-row';

const userBalanceTransactions = {
    controller(args) {
        args.balanceTransactionManager.load();

        return {
            list: args.balanceTransactionManager.list
        };
    },
    view(ctrl, args) {
        const list = ctrl.list;

        return m('.w-section.section.card-terciary.before-footer.balance-transactions-area', [
            m('.w-container', _.map(list.collection(), (item, index) => {
                return m.component(
                    userBalanceTransactionRow, {item: item, index: index});
            })),
            m('.container', [
                m('.w-row.u-margintop-40', [
                    m('.w-col.w-col-2.w-col-push-5', [
                        !list.isLoading() ? (
                            list.isLastPage() ? '' : m('button#load-more.btn.btn-medium.btn-terciary', {
                                onclick: list.nextPage
                            }, 'Load more')
                        ) :
                        h.loader()
                    ])
                ])
            ])
        ]);
    }
};

export default userBalanceTransactions;
