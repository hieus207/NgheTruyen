import './App.css';

function AppWithContainer({children}) {
  
  return (
    <div className="container">
        {children}
    </div>
  );
}

export default AppWithContainer;
