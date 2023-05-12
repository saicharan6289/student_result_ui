import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/NewStudents"> Add New Students </Link>
            </li>
            <li>
              <Link to="/StudentsList"> Students List </Link>
            </li>
            <li>
              <Link to="/NewCourses"> Add New Courses </Link>
            </li>

            <li>
              <Link to="/CourseList"> Courses List </Link>
            </li>

            <li>
              <Link to="/NewResults"> Add New Results </Link>
            </li>

            <li>
              <Link to="/ResultsList"> Results List </Link>
            </li>





          </ul>
        </nav>

        <Outlet />
      </>
  )
};

export default Home;