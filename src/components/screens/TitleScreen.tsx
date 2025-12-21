import { Shield, Rocket, Clock, GraduationCap, Trophy, AlertTriangle } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

export function TitleScreen() {
  const { setCurrentScreen } = useGame();

  return (
    <div className="min-h-screen game-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Shield Icon */}
        <div className="mb-8 animate-bounce-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 glow-primary">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 animate-slide-up">
          Hidden Dangers in Links
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-white/90 mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Spot fake websites, emails, and short links — before scammers catch you!
        </p>

        {/* Warning */}
        <div className="flex items-center justify-center gap-2 text-warning mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <AlertTriangle className="w-5 h-5" />
          <span className="text-sm md:text-base font-medium">
            One wrong click can wipe your entire bank balance!
          </span>
        </div>

        {/* CTA Button */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button
            onClick={() => setCurrentScreen('tutorial')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            Start Your Training
            <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-lg rounded-xl px-4 py-3 border border-white/10">
            <Clock className="w-5 h-5 text-info" />
            <span className="text-white/90 text-sm font-medium">10-minute experience</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-lg rounded-xl px-4 py-3 border border-white/10">
            <GraduationCap className="w-5 h-5 text-success" />
            <span className="text-white/90 text-sm font-medium">Learn to spot scams</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-lg rounded-xl px-4 py-3 border border-white/10">
            <Trophy className="w-5 h-5 text-warning" />
            <span className="text-white/90 text-sm font-medium">Earn your badge</span>
          </div>
        </div>
      </div>
    </div>
  );
}
