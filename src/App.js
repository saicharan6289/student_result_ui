import './App.css';
import CourseList from "./Components/CourseList";
import NewResults from "./Components/NewResults";
import NewStudents from "./Components/NewStudents";
import ResultsList from "./Components/ResultsList";
import StudentsList from "./Components/StudentsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home";
import NewCourses from "./Components/NewCourses";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="CourseList" element={<CourseList/>}/>
            <Route path="NewCourses" element={<NewCourses/>}/>
            <Route path="NewResults" element={<NewResults/>}/>
            <Route path="NewStudents" element={<NewStudents/>}/>
            <Route path="ResultsList" element={<ResultsList/>}/>
            <Route path="StudentsList" element={<StudentsList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
