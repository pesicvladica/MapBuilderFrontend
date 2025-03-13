import logo from './logo.svg';
import './App.css';
import MapView from './components/MapView/MapView';

function App() {
  return (
    <div>
      <input
        onChange={(event) => {
          console.log(event.nativeEvent);
        }}
      />
      <MapView />
    </div>
  );
}

export default App;
