import Container from '@/components/container';
import { pathnames } from '@/constants/pathnames';
import Home from '@/pages/home';
import Student from '@/pages/student';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Container />}>
          <Route path={pathnames.home} element={<Home />} />
        </Route>
        <Route path={pathnames.student} element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
