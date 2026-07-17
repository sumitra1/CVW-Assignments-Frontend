import { useRef } from "react";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const { width, height, resizeCount } = useWindowSize();

  // Count component renders
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom useWindowSize Hook</h2>

      <h3>Window Width : {width}</h3>
      <h3>Window Height : {height}</h3>

      <hr />

      <h3>Resize Events Fired : {resizeCount.current}</h3>

      <h3>Component Re-renders : {renderCount.current}</h3>

      <p>Open DevTools and resize the browser window.</p>
    </div>
  );
}

export default App;