import m from 'mithril';
import h from '../h';

const footer = {
    view() {
        return m('footer.main-footer.main-footer-neg',
            [
                m('section.w-container',
                    m('.w-row',
                        [
                            m('.w-col.w-col-9',
                                m('.w-row',
                                    [
                                        m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4.w-hidden-tiny',
                                            [
                                                m('.footer-full-signature-text.fontsize-small',
                                                    'Welcome'
                                                ),
                                                m('a.link-footer[href=\'http://www.citizensupported.org/coming-soon-how?ref=citizensupported_footer\']',
                                                    [
                                                        'How it works',
                                                        m.trust('&nbsp;'),
                                                        m('span.badge.badge-success',
                                                            'New‍'
                                                        )
                                                    ]
                                                ),
                                                m('a.link-footer[href=\'https://www.citizensupported.org/team?ref=citizensupported_footer\']',
                                                    [
                                                        ' Our team ',
                                                        m.trust('&lt;'),
                                                        '3'
                                                    ]
                                                ),
                                                m('a.link-footer[href=\'http://facebook.com/citizensupported\']',
                                                    ' Facebook'
                                                ),
                                                m('a.link-footer[href=\'http://twitter.com/citznsupported\']',
                                                    ' Twitter'
                                                ),
                                                m('a.link-footer[href=\'http://instagram.com/citizensupported\']',
                                                    ' Instagram'
                                                ),
                                                m('a.link-footer[href=\'http://github.com/citizensupported/citizensupported\']',
                                                    ' Github'
                                                ),
                                                m('a.link-footer[href=\'http://blog.citizensupported.org\']',
                                                    ' Blog'
                                                ),
                                                m('a.link-footer[href=\'https://www.citizensupported.org/jobs\']',
                                                    ' Jobs'
                                                )
                                            ]
                                        ),
                                        m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4.footer-full-firstcolumn',
                                            [
                                                m('.footer-full-signature-text.fontsize-small',
                                                    'Help'
                                                ),
                                                m('a.link-footer[href=\'https://citizensupported.zendesk.com/hc/en-us/requests/new\'][target="_BLANK"]',
                                                    ' Contact'
                                                ),
                                                m('a.link-footer[href=\'https://www.citizensupported.org/press?ref=citizensupported_footer\']',
                                                    ' Press'
                                                ),
                                                m('a.link-footer[href=\'https://citizensupported.zendesk.com/hc/en-us/community/topics?ref=citizensupported_footer/\']',
                                                    ' Support Center'
                                                ),
                                                m('a.link-footer[href=\'https://www.citizensupported.org/guides?ref=citizensupported_footer\']',
                                                    ' Guide for Protesters'
                                                ),
                                                m('a.link-footer[href=\'/terms-of-use\']',
                                                    ' Terms of Use'
                                                ),
                                                m('a.link-footer[href=\'/privacy-policy\']',
                                                    ' Privacy Policy'
                                                )
                                            ]
                                        ),
                                        m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4.footer-full-lastcolumn',
                                            [
                                                m('.footer-full-signature-text.fontsize-small',
                                                    'Browse'
                                                ),
                                                m('a.w-hidden-small.w-hidden-tiny.link-footer[href=\'/start?ref=citizensupported_footer\']',
                                                    ' Fund your activism'
                                                ),
                                                m('a.link-footer[href=\'/explore?ref=citizensupported_footer\']',
                                                    ' Explore protests'
                                                ),
                                                m('a.w-hidden-main.w-hidden-medium.w-hidden-small.link-footer[href=\'http://blog.citizensupported.org?ref=citizensupported_footer\']',
                                                    ' Blog'
                                                ),
                                                m('a.w-hidden-main.w-hidden-medium.w-hidden-small.link-footer[href=\'https://equipecatarse.zendesk.com/account/dropboxes/20298537\']',
                                                    ' Contact'
                                                ),
                                                m('a.w-hidden-tiny.link-footer[href=\'/explore?filter=score&ref=citizensupported_footer\']',
                                                    ' Popular'
                                                ),
                                                m('a.w-hidden-tiny.link-footer[href=\'/explore?filter=online&ref=citizensupported_footer\']',
                                                    ' Just started'
                                                ),
                                                m('a.w-hidden-tiny.link-footer[href=\'/explore?filter=finished&ref=citizensupported_footer\']',
                                                    ' Finished'
                                                )
                                            ]
                                        )
                                    ]
                                )
                            ),
                            m('.w-col.w-col-3.column-social-media-footer',
                                [
                                    m('.footer-full-signature-text.fontsize-small',
                                        'Subscribe to our news'
                                    ),
                                    m('.w-form',
                                        m(`form[accept-charset='UTF-8'][action='${h.getMailchimpUrl()}'][id='mailee-form'][method='post']`,
                                            [
                                                m('.w-form.footer-newsletter',
                                                    m('input.w-input.text-field.prefix[id=\'EMAIL\'][label=\'email\'][name=\'EMAIL\'][placeholder=\'Type your email\'][type=\'email\']')
                                                ),
                                                m('button.w-inline-block.btn.btn-edit.postfix.btn-attached[style="padding:0;"]',
                                                    m('img.footer-news-icon[alt=\'Icon newsletter\'][src=\'/assets/catarse_bootstrap/icon-newsletter.png\']')
                                                )
                                            ]
                                        )
                                    ),
                                    m('.footer-full-signature-text.fontsize-small',
                                        'Social Networks'
                                    ),
                                    m('.w-widget.w-widget-facebook.u-marginbottom-20',
                                        m('.facebook',
                                            m('.fb-like[data-colorscheme=\'dark\'][data-href=\'http://facebook.com/citizensupported\'][data-layout=\'button_count\'][data-send=\'false\'][data-show-faces=\'false\'][data-title=\'\'][data-width=\'260\']')
                                        )
                                    ),
                                    m('.w-widget.w-widget-twitter', [
                                        m(`a.twitter-follow-button[href="http://twitter.com/citznsupported"][data-button="blue"][data-text-color="#FFFFFF][data-link-color="#FFFFFF"][data-width="224px"]`)
                                    ]),
                                    m('.u-margintop-30',
                                        [
                                            m('.footer-full-signature-text.fontsize-small',
                                                'Change language'
                                            ),
                                            m('[id=\'google_translate_element\']')
                                        ]
                                    )
                                ]
                            )
                        ]
                    )
                ),
                m('.w-container',
                    m('.footer-full-copyleft',
                        [
                            m('img.u-marginbottom-20[alt=\'Logo footer\'][src=\"/assets/catarse_bootstrap/logo_big.png\"]'),
                            m('.lineheight-loose',
                                m('a.link-footer-inline[href=\'http://github.com/citizensupported/citizensupported\']',
                                    'Made with love | 2016 | Open source'
                                )
                            )
                        ]
                    )
                )
            ]
        );
    }
};

export default footer;
