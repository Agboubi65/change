import { ThemeProvider } from './ThemeContext';
import ChangePassword  from './changepass';

function App() {
  return (
    <ThemeProvider>
      <ChangePassword/>
    </ThemeProvider>
  );
}

export default App;