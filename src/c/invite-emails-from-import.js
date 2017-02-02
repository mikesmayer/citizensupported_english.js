import m from 'mithril';
import I18n from 'i18n-js';
import _ from 'underscore';
import h from '../h';
import models from '../models';
import postgrest from 'mithril-postgrest';

const inviteEmailsFromImport = {
    controller(args) {
        const checkedList = m.prop([]),
              loading = m.prop(false),
              filterTerm = m.prop(''),
              filteredData = m.prop(args.dataEmails()),
              filtering = m.prop(false),
              onCheckGenerator = (item) => {
                  return () => {
                      const matchEmail = (resource) => {
                          return resource.email === item.email;
                      };
                      if (_.find(checkedList(), matchEmail)) {
                          checkedList(_.reject(checkedList(), matchEmail));
                      } else {
                          checkedList().push(item);
                      }
                  };
              },
              submitInvites = () => {
                  loading(true);

                  if (!_.isEmpty(checkedList)) {
                      postgrest.loaderWithToken(
                          models.inviteProjectEmail.postOptions({
                              data: {
                                  project_id: args.project.project_id,
                                  emails: _.map(checkedList(), (x) => { return x.email; })
                              }
                          })).load().then((data) => {
                              args.modalToggle.toggle();
                              loading(false);
                              args.showSuccess(true);
                          });
                  }
              },
              search = () => {
                  if (!filtering()) {
                      filtering(true);
                      let searchFilter;
                      const matchSearch = (item) => {
                          const pattern = `\b${_.escape(filterTerm())}`,
                                regex = new RegExp(pattern,'gim');

                          return !_.isNull(item.email.match(regex)) || !_.isNull(item.name.match(regex));
                      };

                      if (!_.isEmpty(filterTerm()) || !_.isUndefined(filterTerm())) {
                          searchFilter = _.filter(args.dataEmails(), matchSearch);
                      }

                      filtering(false);
                      return searchFilter || args.dataEmails;
                  }
              };

        return {
            onCheckGenerator: onCheckGenerator,
            submitInvites: submitInvites,
            checkedList: checkedList,
            filterTerm: filterTerm,
            loading: loading,
            search: search,
            filteredData: filteredData,
            filtering: filtering
        };
    },
    view(ctrl, args) {
        const project = args.project;

        return m('div', [
            m('.modal-dialog-header', [
                m('.fontsize-large.u-text-center',
                  'Invite your friends')
            ]),
            m('.modal-dialog-content', (!args.loadingContacts() && !ctrl.loading() ? [
                m('.filter-area', [
                    m('.w-row.u-margintop-20', [
                        m('.w-sub-col.w-col.w-col-12', [
                            m('form[action="javascript:void(0);"]', [
                                m('input.w-input.text-field[type="text"][placeholder="Search by name or email."]', {
                                    onkeyup: m.withAttr('value', ctrl.filterTerm),
                                    onchange: (e) => { e.preventDefault(); }
                                })
                            ])
                        ])
                    ])
                ]),
                m('.emails-area.u-margintop-40', {style: {height: '250px', 'overflow-x': 'auto'}},
                  (ctrl.filtering() ? h.loader() : _.map(ctrl.search(), (item, i) => {
                      return m('.w-row.u-marginbottom-20', [
                          m('.w-sub-col.w-col.w-col-1', [
                              m(`input[type='checkbox'][name='check_${i}']`, {onchange: ctrl.onCheckGenerator(item)})
                          ]),
                          m('.w-sub-col.w-col.w-col-4', [
                              m(`label.fontsize-small[for='check_${i}']`, item.name)
                          ]),
                          m('.w-sub-col.w-col.w-col-7', [
                              m(`label.fontsize-small.fontweight-semibold[for='check_${i}']`, item.email)
                          ])
                      ]);
                  }))
                )
            ] : h.loader())),
            m('.modal-dialog-nav-bottom.u-text-center', [
                (!args.loadingContacts() && !ctrl.loading() && !ctrl.filtering() ?
                 m('.u-text-center.u-margintop-20', [
                     m('a.btn.btn-inline.btn-medium.w-button[href="javascript:void(0)"]', {
                         onclick: ctrl.submitInvites
                     }, `To send ${ctrl.checkedList().length} Invitations`)
                 ]) : (!ctrl.loading() ? 'Loading contacts...' : 'Sending invitations...'))
            ])
        ]);
    }
};

export default inviteEmailsFromImport;
