import * as React from "react";
import { Outlet, Route, Routes, Link, useParams, BrowserRouter} from "react-router-dom";
// export default function CoursesMF() {
//     // These routes are defined when this component is loaded on demand via
//     // dynamic import() on the home page!
//     return (
//         <Routes>
//             <Route path="/" element={<CoursesLayout />}>
//                 <Route index element={<CoursesIndex />} />
//                 <Route path=":id" element={<Course />} />
//             </Route>
//         </Routes>
//     );
// }

export default function CoursesMF() {
    // These routes are defined when this component is loaded on demand via
    // dynamic import() on the home page!
    return (
       // <BrowserRouter>
        <Routes>
            <Route path="/courses" element={<CoursesLayout />}>
                <Route index element={<CoursesIndex />} />
                <Route path=":id" element={<Course />} />
            </Route>
        </Routes>
        //</BrowserRouter>
    );
}

 function CoursesIndex() {
    return (
        <div>
            <p>Please choose a course:</p>

            <nav>
                <ul>
                    <li>
                        <Link to="react-fundamentals">React Fundamentals</Link>
                    </li>
                    <li>
                        <Link to="advanced-react">Advanced React</Link>
                    </li>
                    <li>
                        <Link to="react-router">React Router</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
 function Course() {
    let { id } = useParams<"id">();

    return (
        <div>
            <h2>
                Welcome to the {id!.split("-").map(capitalizeString).join(" ")} course!
            </h2>

            <p>This is a great course. You're gonna love it!</p>

            <Link to="/courses">See all courses</Link>
        </div>
    );
}

function capitalizeString(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}


function CoursesLayout() {
    return (
            <Outlet />
    );
}
