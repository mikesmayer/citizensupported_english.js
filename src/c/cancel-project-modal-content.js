/**
 * window.c.cancelProjectModalContent component
 * Render cancel project modal
 *
 */
import m from 'mithril';
import models from '../models';
import postgrest from 'mithril-postgrest';

const cancelProjectModalContent = {
    controller(args) {
        let l = m.prop(false),
            checkError = m.prop(false),
            check = m.prop('');

        const showNextModal = () => {
            if (check() === 'cancelar-projeto'){
                args.displayModal.toggle();
                document.getElementById('send-message').style.display = 'block';
            } else {
                checkError(true);
            }
            return false;
        };

        return {
            showNextModal: showNextModal,
            checkError: checkError,
            check: check
        };
    },

    view(ctrl, args) {
        return m('form.cancel-project-modal.modal-dialog-content', {onsubmit: ctrl.showNextModal},
                [
                    m('.fontsize-small.u-marginbottom-20',
                        [
                            'Upon cancellation, your campaign will appear on the platform as "non-funded" and your supporters will be immediately reimbursed. ',
                            m('span.fontweight-semibold',
                                'This action cannot be undone!'
                            ),
                            m('en'),
                            m('span.fontweight-semibold')
                        ]
                    ),
                    m('.fontsize-small.u-marginbottom-10',
                        [
                            'If you are sure you want to cancel your project, please confirm by writing ',
                            m('span.fontweight-semibold.text-error',
                                'cancelar-projeto '
                            ),
                            'in the field below. Then we will ask you to write a message to your supporters and your project will then be canceled.',
                            m('span.fontweight-semibold.text-error')
                        ]
                    ),
                    m('.w-form',
                        [
                            m('input.positive.text-field.u-marginbottom-40.w-input[maxlength=\'256\'][type=\'text\']', {class: !ctrl.checkError() ? false : 'error', placeholder: 'cancelar-projeto', onchange: m.withAttr('value', ctrl.check)})
                        ]
                    ),
                    m('div',
                        m('.w-row',
                            [
                                m('.w-col.w-col-3'),
                                m('.u-text-center.w-col.w-col-6',
                                    [
                                        m('input.btn.btn-inactive.btn-large.u-marginbottom-20[type=\'submit\'][value=\'Next step >\']'),
                                        m('a.fontsize-small.link-hidden-light[href=\'#\']', {onclick: args.displayModal.toggle},
                                            'Cancel'
                                        )
                                    ]
                                ),
                                m('.w-col.w-col-3')
                            ]
                        )
                    )
                ]);
    }
};

export default cancelProjectModalContent;
