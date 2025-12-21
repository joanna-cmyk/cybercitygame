import { useGame } from '@/contexts/GameContext';
import { TitleScreen } from './screens/TitleScreen';
import { TutorialScreen } from './screens/TutorialScreen';
import { Round1Screen } from './screens/Round1Screen';
import { Round2Screen } from './screens/Round2Screen';
import { Case1Screen, Case2Screen, Case3Screen } from './screens/CaseScreens';
import { FinalResultsScreen } from './screens/FinalResultsScreen';

export function GameContainer() {
  const { currentScreen } = useGame();

  switch (currentScreen) {
    case 'title':
      return <TitleScreen />;
    case 'tutorial':
      return <TutorialScreen />;
    case 'round1':
    case 'round1-results':
      return <Round1Screen />;
    case 'round2':
    case 'round2-results':
      return <Round2Screen />;
    case 'case1':
      return <Case1Screen />;
    case 'case2':
      return <Case2Screen />;
    case 'case3':
      return <Case3Screen />;
    case 'final-results':
      return <FinalResultsScreen />;
    default:
      return <TitleScreen />;
  }
}
