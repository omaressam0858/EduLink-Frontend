import { Route, Routes  } from "react-router-dom";
import NavigationBar from "./Navbar/Navigationbar";

import GroupList from "./Groups/Group";
import CreateGroup from "./Groups/CreateGroup";
import CreateSchedule from "./Groups/CreateSchedule";
function App() {
  return (
    <div className="App">
      <NavigationBar >
      <Routes>
        <Route path="/" element={<GroupList />}/>
        
        <Route path="/students" />
        <Route path="/students/add" />
        <Route path="/students/:id" />

        <Route path="/groups/add" element={<CreateGroup/>} />
        <Route path="/groups/schedule/add" element={<CreateSchedule />}  />
        <Route path="/groups/:id" />
      </Routes>
      </NavigationBar>
    </div>
  );
}

export default App;
