import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CodeViewer from "@/components/CodeViewer";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* Demo code viewer */}
      <section id="live-preview" className="py-20 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Live Preview</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            See what gets generated
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real output from a real diff. Browse Python tests and XML configs in a developer-friendly viewer.
          </p>
        </div>
        <CodeViewer />
      </section>

      <section id="benefits">
        <Benefits />
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center bg-radial-fade">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Stop writing tests manually
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
          Join the teams shipping faster with AI-generated test coverage.
        </p>
        <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 rounded-md bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all glow-red-intense">
          Get Started Free
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
