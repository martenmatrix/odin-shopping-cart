import { useEffect, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useCustomSearchParams() {
    const customURLSearchParams = URLSearchParams;
    customURLSearchParams.prototype.remove = function(key, value) {
        const entries = this.getAll(key);
        const newEntries = entries.filter(entry => entry !== value);
        this.delete(key);
        newEntries.forEach(newEntry => this.append(key, newEntry));
    }

    const [currentSearchParams, setCurrentSearchParams] = useState(new customURLSearchParams());

    const navigate = useNavigate();
    const location = useLocation(); // couldn't i just use window.location.pathname ?

    const setSearchParams = useCallback((newParams) => {
        const newObject = new URLSearchParams(newParams);
        localStorage.setItem('filter', newObject);
        const to = { pathname: location.pathname, hash: location.hash, search: newParams.toString() };
        navigate(to, { replace: true });
    }, [location.pathname, location.hash, navigate]);

    const addSearchParam = (key, value) => {
        const newURLParams = new URLSearchParams(window.location.search);
        newURLParams.append(key, value);
        setSearchParams(newURLParams);
    }
    
    const removeSearchParam = (key, value) => {
        const newURLParams = new customURLSearchParams(window.location.search); // useLocation does not update quick enough?
        newURLParams.remove(key, value);
        setSearchParams(newURLParams);
    }

    useEffect(() => {
        setCurrentSearchParams(new URLSearchParams(location.search));
    }, [location.search]);

    useEffect(() => {
        const filters = localStorage.getItem('filter');
        if (filters) {
            setSearchParams(filters);
        }
    }, [location.pathname, setSearchParams]) // does not trigger when user clicks home nav button twice because path stays the same => filter will be reset

    return [addSearchParam, removeSearchParam, currentSearchParams];
}

export { useCustomSearchParams };
