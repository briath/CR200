import Hero from '../components/Hero';
import ProblemSolution from '../components/ProblemSolution';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Cases from '../components/Cases';
import Process from '../components/Process';
import Trust from '../components/Trust';
import CostCalculator from '../components/CostCalculator';
import ContactForm from '../components/ContactForm';
import AIDemo from '../components/AIDemo';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <Services />
      <TechStack />
      <Cases />
      <Process />
      <Trust />
      <CostCalculator />
      <ContactForm />
      <AIDemo />
    </main>
  );
}
