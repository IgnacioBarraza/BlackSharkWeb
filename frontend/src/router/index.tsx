import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function Router(props) {
    const routes = props.routes.map((element) => {
        if (!element.protection) {
            return (
                <Route
                    key={element.path}
                    path={element.path}
                    element={element.component}
                >{element.routes && element.routes.map(
                    (route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                        />
                    )
                )}</Route>
            );
        }
        return (
            <Route key={element.path} element={element.protection}>
                <Route path={element.path} element={element.component}>
                    {element.routes && element.routes.map(
                    (route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                        />
                    )
                )}
                </Route>
            </Route>
        );
    });
    return (
        <BrowserRouter>
            <Routes>
                {routes}
                {/* <Route path='*' element={<Page404 />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}