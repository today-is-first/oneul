import './App.css';
import Header from '@components/common/Header';

function App() {
  return (
    <div>
      <Header
        left={<div>Left</div>}
        center={<div>Center</div>}
        right={<div>Right</div>}
      />
    </div>
  );
}

export default App;
