/**
 * window.c.SuccessfulProjectTaxModal component
 * Modal content for show project transfer complete values data
 */
import m from 'mithril';
import h from '../h';

const successfulProjectTaxModal = {
    view(ctrl, args) {
        let en = args.projectTransfer;

        return m('div',[
            m('.modal-dialog-header', [
                m('.fontsize-large.u-text-center',
                  'Project Extract')
            ]),
            m('.modal-dialog-content', [
                m('p.fontsize-small.u-marginbottom-40', [
                    'Check the extract of your project, including the fees and retentions. If you have questions about how this calculation is done, ',
                    m('a.alt-link[href="http://suporte.citizensupported.org/hc/pt-br/articles/202037493-FINANCIADO-Como-ser%C3%A1-feito-o-repasse-do-dinheiro-"][target="__blank"]', 'Access here'),
                    '.'
                ]),
                m('div', [
                    m('.w-row.fontsize-small.u-marginbottom-10', [
                        m('.w-col.w-col-4', [
                            m('.text-success', `+ $ ${h.formatNumber(en.pledged, 2)}`)
                        ]),
                        m('.w-col.w-col-8', [
                            m('div', `Total collection (${en.total_contributions} Supports)`)
                        ])
                    ]),
                    (en.irrf_tax > 0 ?
                     m('.w-row.fontsize-small.u-marginbottom-10', [
                         m('.w-col.w-col-4', [
                             m('.text-success', `+ $ ${h.formatNumber(en.irrf_tax, 2)}`)
                         ]),
                         m('.w-col.w-col-8', [
                             m('div', 'Retention IRRF (Income Tax withholding)')
                         ])
                     ]) : ''),
                    m('.w-row.fontsize-small.u-marginbottom-10', [
                        m('.w-col.w-col-4', [
                            m('.text-error', `- $ ${h.formatNumber(en.catarse_fee, 2)}`)
                        ]),
                        m('.w-col.w-col-8', [
                            m('div', `Citizen Supported fee and means of payment (${h.formatNumber((en.service_fee * 100), 2)}%) `)
                        ])
                    ]),
                    m('.divider.u-marginbottom-10'),
                    m('.w-row.fontsize-base.fontweight-semibold', [
                        m('.w-col.w-col-4', [
                            m('div', `$ ${h.formatNumber(en.total_amount, 2)}`)
                        ]),
                        m('.w-col.w-col-8', [
                            m('div', 'Total to be transferred')
                        ])
                    ])
                ])
            ])
        ]);
    }
};

export default successfulProjectTaxModal;
