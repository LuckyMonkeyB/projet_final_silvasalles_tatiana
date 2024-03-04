export const fetchData = async (setData, setIsLoading) => {
    try{
        const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
        const data = await response.json();
        setData(data);
        setIsLoading(false)
    }catch (error){
        console.error('Error fetching data:', error)
    }
};

