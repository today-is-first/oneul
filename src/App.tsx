import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/pages/Header";
import Main from "@/pages/Main";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex h-full flex-col bg-black">
        <Header />
        <Main />
      </section>
    </QueryClientProvider>
  );
}

export default App;
