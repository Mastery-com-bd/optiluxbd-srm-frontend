import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        OptiluxBD SRM System <span className="text-orange-500">With</span>{" "}
        <br />
        React + TypeScript + Redux RTK + React Router+TailwindCSS+ShadcnUI
      </h1>
      <div>
        <Button variant="outline" className="mt-4">
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default App;
