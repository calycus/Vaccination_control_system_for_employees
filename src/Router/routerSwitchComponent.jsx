import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../Page/Home/HomePage'
import Index from '../Page/Components/App';
import Error404NotFound from '../Error_404_Not_Found';

const RotuerSwitchComponent = () => {

    return (
        <Routes>
            <Route path='/' element={
                <HomePage />
            } />
            <Route path='/index' element={
                <Index />
            } />
            <Route path="/404_not_found" element={
                <Error404NotFound />
            } />
            <Route path="*" element={
                <Navigate to={"/404_not_found"} />
            } />

        </Routes>
    )
}
export default RotuerSwitchComponent

