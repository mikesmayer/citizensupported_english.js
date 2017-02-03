beforeAll(function() {
  TranslationsFactory = function(attrs) {
      window.I18n.defaultLocale = "en";
      window.I18n.locale = "en";
      I18n.translations = attrs;
  };
  TranslationsFactory({
      en: {
          projects: {
              faq: {
                  aon: {
                      description: 'fake descriptions',
                      questions: {
                          1: {
                              question: 'question_1',
                              answer: 'answer_1'
                          }
                      }
                  }
              }
          }
      }
  })
});
