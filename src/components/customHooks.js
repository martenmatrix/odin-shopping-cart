import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useCustomSearchParams() {
    const customURLSearchParams = URLSearchParams;
    customURLSearchParams.prototype.remove = function(key, value) {
        const entries = this.getAll(key);
        const newEntries = entries.filter(entry => entry !== value);
        this.delete(key);
        newEntries.forEach(newEntry => this.append(key, newEntry));
    }

    const navigate = useNavigate();
    const location = useLocation(); // couldn't i just use window.location.pathname ?

    const setSearchParams = (newParams) => {
        const newObject = new URLSearchParams(newParams);
        localStorage.setItem('filter', newObject);
        const to = { pathname: location.pathname, search: newParams.toString() };
        navigate(to, { replace: true });
    }

    const addSearchParam = (key, value) => {
        const newURLParams = new URLSearchParams(location.search);
        newURLParams.append(key, value);
        setSearchParams(newURLParams);
    }
    
    const removeSearchParam = (key, value) => {
        const newURLParams = new customURLSearchParams(location.search);
        newURLParams.remove(key, value);
        setSearchParams(newURLParams);
    }

    const getSearchParams = () => {
        return new URLSearchParams(location.search);
    }

    useEffect(() => {
        const filters = localStorage.getItem('filter');
        if (filters) {
            setSearchParams(filters);
        }
    }, [location.pathname]) // does not trigger when user clicks home nav button twice because path stays the same => filter will be reset

    return [addSearchParam, removeSearchParam, getSearchParams()];
}

export { useCustomSearchParams };
