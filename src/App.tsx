import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-red-500">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </QueryClientProvider>
  );
}

export default App;
