import React from 'react';
import Header from './components/Header';

export function App() {
  function toggleDrawer(anchor: string, arg1: boolean): React.MouseEventHandler<HTMLButtonElement> | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <Header></Header>
    </div>
  );
}

export default App;
