import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import OnboardingStep from '../../components/OnboardingStep/OnboardingStep';
import { Container } from './styles';
import { EOnboardingButtonType } from '../../components/OnboardingButton/types';
import {
  setUserId as setUserIdCookie,
  setUserSequences as setUserSequenceCookie,
} from '../../helpers/cookie-helper';
import { guid } from '../../helpers/uuid-helper';
import { selectAddSequence, selectSequences, selectSetUserId, useUser } from '../../state/user';
import StepIntro from './components/StepIntro/StepIntro';
import StepDuration from './components/StepDuration/StepDuration';
import StepArrangment from './components/StepArrangement/StepArrangement';
// import StepActivities from './components/StepActivities/StepActivities';
// import { MENTAL_ACTIVITIES, PHYSICAL_ACTIVITIES } from './components/StepActivities/constants';
// import StepPriority from './components/StepPriority/StepPriority';
import { selectBlockOrder, selectDurations, selectName, useOnboarding } from './state';
import { ISequence } from '../../interfaces/sequence-interface';
import StepName from './components/StepName/StepName';
import { ECategory } from '../../enums/category';
// import StepSummary from './components/StepSummary/StepSummary';
import Header from '../../components/Header/Header';
import { ERoutes } from '../../routes/types';

const getDefaultSequenceTitle = () => `Sequence${Math.floor(Math.random() * 89 + 10)}`;

const Onboarding = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const refsObj = useRef<{ [key: number]: any }>({});

  // zustand
  const setUserId = useUser(selectSetUserId);
  const addUserSequence = useUser(selectAddSequence);
  const blockOrder = useOnboarding(selectBlockOrder);
  const durations = useOnboarding(selectDurations);
  const name = useOnboarding(selectName);
  const userSequences = useUser(selectSequences);

  const goBack = useCallback(() => {
    history.replace(ERoutes.DEFAULT);
  }, []);

  const scrollToStep = (step: number) => {
    const documentHeight = document.documentElement.clientHeight;
    const top: number = step * 0.96 * documentHeight;

    document.documentElement.scrollTo({ top, behavior: 'smooth' });
  };

  const onSubmit = useCallback(() => {
    const userId = guid();
    setUserId(userId);

    const sequence: ISequence = {
      id: guid(),
      title: name !== '' ? name : getDefaultSequenceTitle(),
      subsequences: [
        { position: 0, block: { type: blockOrder.first, duration: durations[blockOrder.first] } },
        { position: 0, block: { type: blockOrder.second, duration: durations[blockOrder.second] } },
        { position: 0, block: { type: blockOrder.third, duration: durations[blockOrder.third] } },
      ],
      break: durations.break,
    };

    const workIndex = sequence.subsequences.findIndex((ss) => ss.block.type === ECategory.WORK);
    sequence.subsequences.splice(workIndex + 1, 0, {
      position: 0,
      block: { type: ECategory.RECAP, duration: durations.recap },
    });

    for (let i = 0; i < sequence.subsequences.length; i += 1) {
      sequence.subsequences[i].position = i;
    }

    addUserSequence(sequence);

    // Set cookies
    setUserIdCookie(userId); // Indicator for onboarding successfully done.
    setUserSequenceCookie([...userSequences, sequence]);

    goBack();
  }, [name, blockOrder, durations]);

  const showButtons = window.innerHeight >= 800;

  return (
    <>
      <Header />
      <Container>
        <div
          ref={(ref) => {
            refsObj.current[0] = ref;
          }}
          className="step-container"
        >
          <OnboardingStep
            headline={t('onboarding.intro.headline')}
            buttons={
              showButtons
                ? [
                    { type: EOnboardingButtonType.NONE, onClick: () => {} },
                    { type: EOnboardingButtonType.NEXT, onClick: () => scrollToStep(1) },
                  ]
                : []
            }
          >
            <StepIntro />
          </OnboardingStep>
        </div>

        <div
          ref={(ref) => {
            refsObj.current[1] = ref;
          }}
          className="step-container"
        >
          <OnboardingStep
            headline={t('onboarding.arrangement.headline')}
            buttons={
              showButtons
                ? [
                    { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(0) },
                    { type: EOnboardingButtonType.NEXT, onClick: () => scrollToStep(2) },
                  ]
                : []
            }
          >
            <StepArrangment />
          </OnboardingStep>
        </div>

        <div
          ref={(ref) => {
            refsObj.current[2] = ref;
          }}
          className="step-container"
        >
          <OnboardingStep
            headline={t('onboarding.duration.headline')}
            buttons={
              showButtons
                ? [
                    { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(1) },
                    { type: EOnboardingButtonType.NEXT, onClick: () => scrollToStep(3) },
                  ]
                : []
            }
          >
            <StepDuration />
          </OnboardingStep>
        </div>

        {/* <div
        ref={(ref) => {
          refsObj.current[3] = ref;
        }}
        className="step-container"
      >
        <OnboardingStep
          headline={t('onboarding.physical-activities.headline')}
          buttons={showButtons ?[
            { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(2) },
            { type: EOnboardingButtonType.NEXT, onClick: () => scrollToStep(4) },
          ]}
        >
          <StepActivities activities={PHYSICAL_ACTIVITIES} />
        </OnboardingStep>
      </div>

      <div
        ref={(ref) => {
          refsObj.current[4] = ref;
        }}
        className="step-container"
      >
        <OnboardingStep
          headline={t('onboarding.physical-priorities.headline')}
          buttons={showButtons ?[
            { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(3) },
            { type: EOnboardingButtonType.NEXT, onClick: () => scrollToStep(5) },
          ]}
        >
          <StepPriority
            // TODO: pass in activities from prio steps
            activities={[
              { name: PHYSICAL_ACTIVITIES[0], priority: 1 },
              { name: PHYSICAL_ACTIVITIES[2], priority: 1 },
            ]: []}
            onPriorityChanged={(name: string, prio: number) => {
              console.log(`${name} changed prio to ${prio}`);
            }}
          />
        </OnboardingStep>
      </div>

      <div
        ref={(ref) => {
          refsObj.current[5] = ref;
        }}
        className="step-container"
      >
        <OnboardingStep
          headline={t('onboarding.mental-activities.headline')}
          buttons={showButtons ?[
            { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(4) },
            { type: EOnboardingButtonType.NEXT, onClick: () => scrollToStep(6) },
          ]}
        >
          <StepActivities activities={MENTAL_ACTIVITIES} />
        </OnboardingStep>
      </div>

      <div
        ref={(ref) => {
          refsObj.current[6] = ref;
        }}
        className="step-container"
      >
        <OnboardingStep
          headline={t('onboarding.mental-priorities.headline')}
          buttons={showButtons ?[
            { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(5) },
            { type: EOnboardingButtonType.NEXT, onClick: () => scrollToStep(7) },
          ]}
        >
          <StepPriority
            // TODO: pass in activities from prio steps
            activities={[
              { name: MENTAL_ACTIVITIES[0], priority: 1 },
              { name: MENTAL_ACTIVITIES[2], priority: 1 },
            ]: []}
            onPriorityChanged={(name: string, prio: number) => {
              console.log(`${name} changed prio to ${prio}`);
            }}
          />
        </OnboardingStep>
      </div> */}

        <div
          ref={(ref) => {
            refsObj.current[3] = ref;
          }}
          className="step-container"
        >
          <OnboardingStep
            headline={t('onboarding.naming.headline')}
            buttons={
              showButtons
                ? [
                    { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(2) },
                    { type: EOnboardingButtonType.SUBMIT, onClick: onSubmit },
                  ]
                : [
                    { type: EOnboardingButtonType.NONE, onClick: () => {} },
                    { type: EOnboardingButtonType.SUBMIT, onClick: onSubmit },
                  ]
            }
          >
            <StepName />
          </OnboardingStep>
        </div>

        {/* <div
          ref={(ref) => {
            refsObj.current[4] = ref;
          }}
          className="step-container"
        >
          <OnboardingStep
            headline={t('onboarding.review.headline')}
            buttons={showButtons ?[
              { type: EOnboardingButtonType.BACK, onClick: () => scrollToStep(3) },
              { type: EOnboardingButtonType.SUBMIT, onClick: onSubmit },
            ]: []}
          >
            <StepSummary />
          </OnboardingStep>
        </div> */}
      </Container>
    </>
  );
};

export default Onboarding;
