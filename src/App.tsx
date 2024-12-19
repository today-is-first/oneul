import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/pages/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex h-screen flex-col bg-black">
        <Header />
      </section>
    </QueryClientProvider>
  );
}

export default App;
