import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import './styles/main.scss'
import { paths } from "./utils/path";
import { useSelector } from "react-redux";


const Frontlayout = React.lazy(() =>
    import("./shared/FrontLayout/Frontlayout")
);
const LoginLayout = React.lazy(() =>
    import("./shared/FrontLayout/LoginLayout")
);

// log in imports 
const Login = React.lazy(() =>
    import("./components/Login/Login")
);


// logged In imports 
const Dashboard = React.lazy(() =>
    import("./components/Dashboard/Dashboard")
);



export default function Router() {
    const loggedIn = useSelector((state) => state?.login?.isLoggedIn);

    const loading = (
        <div className="loading">
            <h1>Loading...</h1>
        </div>
    );
    return (
        <Suspense fallback={loading}>
            <Routes>
                {!loggedIn ?
                    <Route path={paths?.front?.commonPoint} element={<LoginLayout />}>
                        <Route
                            path={paths?.front?.user?.login}
                            element={<Login />}
                        />
                        {/* <Route
                            path={paths?.front?.user?.reset_password}
                            element={<ResetPassword />}
                        />

                        <Route
                            path={paths?.front?.user?.check_mail}
                            element={<CheckMail />}
                        />

                        <Route
                            path={paths?.front?.user?.create_new_password}
                            element={<CreateNewPassword />}
                        /> */}

                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Route>

                    :
                    <Route path={paths?.front?.commonPoint} element={<Frontlayout />}>
                        <Route
                            path={paths?.front?.user?.dashboard}
                            element={<Dashboard />}
                        />

                        {/* customer path  */}



                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Route>
                }


            </Routes>
        </Suspense>
    );
}
