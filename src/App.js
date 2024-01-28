import { Route, Routes , Link } from "react-router-dom";
import NavigationBar from "./Navbar/Navigationbar";

import GroupList from "./Groups/Group";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<GroupList />}/>
        
        <Route path="/students" />
        <Route path="/students/add" />
        <Route path="/students/:id" />

        <Route path="/groups/add" />
        <Route path="/groups/schedule/add" />
        <Route path="/groups/:id" />
      </Routes>
    </div>
  );
}

export default App;
