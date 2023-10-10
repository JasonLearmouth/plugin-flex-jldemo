import * as Flex from '@twilio/flex-ui';

import { createI18n, I18nProvider, useI18n } from 'react-simple-i18n';
import translation_en_us from '../../strings/languages/en-US/common.json';
import translation_ja_jp from '../../strings/languages/ja-JP/common.json';

import { FlexComponent } from '../../../../../types/feature-loader';
import { Tab } from '@twilio/flex-ui';
import CallTranscript from '../../../custom-components/CallTranscript/CallTranscript';

export const componentName = FlexComponent.CRMContainer;
export const componentHook = function addTabsCRMContainer(flex: typeof Flex, _manager: Flex.Manager) {
  /***********************
   *  Add localisation
   ***********************/
  const langData = {
    'en-US': translation_en_us,
    'ja-JP': translation_ja_jp,
    ja: translation_ja_jp,
  };

  const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;

  // Get the app locale by checking if a language has been configured or use default
  const appLocale = Object.hasOwn(langData, userLocale) ? userLocale : 'en-US';

  // Add Localisation
  Flex.setProviders({
    CustomProvider: (RootComponent) => (props) => {
      return (
        <I18nProvider i18n={createI18n(langData, { lang: appLocale })}>
          <RootComponent {...props} />
        </I18nProvider>
      );
    },
  });

  const va_tab_options: Flex.ContentFragmentProps = {
    if: (props: any) => {
      // Only display if we have a va_call_sid
      return Object.hasOwn(props.task?.attributes, 'va_call_sid') ? true : false;
    },
    sortOrder: -1,
  };

  /**********************
   *  TAB - Virtual Agent
   **********************/
  flex.TaskCanvasTabs.Content.add(
    <Tab uniqueName="virtual-agent-data" key="virtual-agent-data" label="Virtual Agent">
      <CallTranscript />
    </Tab>,
    va_tab_options,
  );
};
