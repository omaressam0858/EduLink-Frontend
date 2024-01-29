import { Route, Routes  } from "react-router-dom";
import NavigationBar from "./Navbar/Navigationbar";

import GroupList from "./Groups/Group";
import CreateGroup from "./Groups/CreateGroup";
import CreateSchedule from "./Groups/CreateSchedule";
import GroupDetailsComponent from "./Groups/GroupPage";

import StudentList from "./Students/StudentsList";
import StudentAdd from "./Students/AddStudent";
function App() {
  return (
    <div className="App">
      <NavigationBar >
      <Routes>
        <Route path="/" element={<GroupList />}/>
        
        <Route path="/students" element={<StudentList />}/>
        <Route path="/students/add" element= {<StudentAdd />}/>

        <Route path="/groups/add" element={<CreateGroup/>} />
        <Route path="/groups/schedule/add" element={<CreateSchedule />}  />
        <Route path="/groups/:groupId" element ={<GroupDetailsComponent/>}/>
        
        <Route path="/absence/:groupId" />
      </Routes>
      </NavigationBar>
    </div>
  );
}

export default App;
