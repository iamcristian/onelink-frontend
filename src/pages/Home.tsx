import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <Header />
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to OneLink</h1>
      <p className="text-xl mb-8">
        Create your personalized link page in minutes!
      </p>
      <Button asChild size="lg">
        <Link to="/register">Get Started</Link>
      </Button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
