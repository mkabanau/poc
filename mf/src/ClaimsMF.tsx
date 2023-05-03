import * as React from "react";
import { Outlet, Route, Routes, Link, useParams, BrowserRouter } from "react-router-dom";
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

export default function ClaimsMF() {
    // These routes are defined when this component is loaded on demand via
    // dynamic import() on the home page!
    return (
       // <BrowserRouter>
            <Routes>
                <Route path="/claims" element={<ClaimsLayout />}>
                    <Route index element={<ClaimsIndex />} />
                    <Route path=":id" element={<Claim />} />
                </Route>
            </Routes>
        //</BrowserRouter>
    );
}

function ClaimsIndex() {
    return (
        <div>
            <p>Please choose a claim:</p>

            <nav>
                <ul>
                    <li>
                        <Link to="twitter">twitter</Link>
                    </li>
                    <li>
                        <Link to="github">github</Link>
                    </li>
                    <li>
                        <Link to="google">google</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
function Claim() {
    let { id } = useParams<"id">();

    return (
        <div>
            <h2>
                Welcome to the {id!.split("-").map(capitalizeString).join(" ")} claim provider!
            </h2>

            <p>This is a great claim. You're gonna love it!</p>

            <Link to="/claims">See all courses</Link>
        </div>
    );
}

function capitalizeString(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}


function ClaimsLayout() {
    return (
        <Outlet />
    );
}
