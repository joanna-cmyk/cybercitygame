import { Rocket, BookOpen, Target, Trophy, Clock } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

export function TitleScreen() {
  const { setCurrentScreen } = useGame();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* LINE 1: Main Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 animate-slide-up">
          Hidden Dangers in Links
        </h1>

        {/* LINE 2: Warning */}
        <p className="text-xl md:text-2xl font-bold text-warning mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          ⚠️ One wrong click can wipe your entire bank balance!
        </p>

        {/* LINE 3: Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Spot fake websites, emails, and short links — before scammers catch you!
        </p>

        {/* LINE 4: Three-Column Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="feature-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Learn</h3>
            <p className="text-sm text-muted-foreground">
              Understand how scammers trick you with fake URLs and emails
            </p>
          </div>

          <div className="feature-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Practice</h3>
            <p className="text-sm text-muted-foreground">
              Identify real vs fake websites, emails, and suspicious messages
            </p>
          </div>

          <div className="feature-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10 mb-4">
              <Trophy className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Master</h3>
            <p className="text-sm text-muted-foreground">
              Earn achievements and protect yourself from online scams
            </p>
          </div>
        </div>

        {/* LINE 5: Duration */}
        <p className="text-sm text-muted-foreground mb-8 flex items-center justify-center gap-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Clock className="w-4 h-4" />
          Approximately 10 minutes to complete
        </p>

        {/* LINE 6: CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={() => setCurrentScreen('tutorial')}
            size="lg"
            className="font-bold text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            Start Learning
            <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
