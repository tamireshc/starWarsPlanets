import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Starwarscontext from './StarwarsContext';

function Provider({ children }) {
  const ONE = 1;
  const [data, setData] = useState([]);
  const [dataComplete, setDataComplete] = useState([]);
  const [title, setTitle] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterValue, setFilterValue] = useState(0);
  const [order, setOrder] = useState('population');
  const [typeOrder, setTypeOrder] = useState('ASC');
  const [filterSave, setFilteSave] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [columnFilterArrayValues, setColumnFilterValue] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [teste, setTeste] = useState(true);

  useEffect(() => {
    const fetchDataApi = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataAPI = await response.json();
      // console.log(dataAPI.results);
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
      dataAPI.results.map((item) => delete item.residents);
      dataAPI.results.map((item) => delete item.created);
      dataAPI.results.map((item) => delete item.url);
      dataAPI.results.map((item) => delete item.edited);
      // console.log(dataAPI.results[0]);
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      setData(dataAPI.results.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -ONE;
        }
        return 0;
      }));
      setDataComplete(dataAPI.results);
      setTitle(Object.keys(dataAPI.results[0]));
      // console.log(Object.keys(dataAPI.results[0]));
    };
    fetchDataApi();
  }, []);

  const restoreDataBeforeExclusion = async (item) => {
    const attFilterSave = filterSave.filter((x) => x[0] !== item[0]);
    setFilteSave(attFilterSave);
    // console.log(attFilterSave);
    // console.log(attFilterSave[0][2], attFilterSave[0][0], +attFilterSave[0][4]);
    const newdata = attFilterSave.map((itemsalvo, index) => dataComplete?.filter((y) => {
      switch (attFilterSave[index][2]) {
      case 'maior que':
        return y[attFilterSave[index][0]] > +attFilterSave[index][4];
      case 'menor que':
        return y[attFilterSave[index][0]] < +attFilterSave[index][4];
      case 'igual a':
        return y[attFilterSave[index][0]] === attFilterSave[index][4];
      default: return null;
      }
    }));

    if (attFilterSave.length > 0) {
      setData(newdata[0]);
    } if (attFilterSave.length === 0) {
      setData(dataComplete);
    }
  };

  const sortDataNumeric = () => {
    if (typeOrder === 'ASC') {
      const dataSortNumber = data?.sort((a, b) => a[order] - b[order]);
      console.log('asc');
      setData(dataSortNumber);
    } if (typeOrder === 'DESC') {
      console.log('desc');
      const dataSortNumber = data?.sort((a, b) => b[order] - a[order]);
      setData(dataSortNumber);
    }
  };

  const sortDataPopulation = () => {
    const dataWithoutUnknown = data.filter((item) => item[order] !== 'unknown');
    const dataWithtUnknown = data.filter((item) => item[order] === 'unknown');

    if (typeOrder === 'ASC') {
      const dataSortNumber = dataWithoutUnknown.sort((a, b) => a[order] - b[order]);
      const newData = [...dataSortNumber, ...dataWithtUnknown];
      console.log(newData);
      setData(newData);
    } else {
      const dataSortNumber = dataWithoutUnknown.sort((a, b) => b[order] - a[order]);
      const newData = [...dataSortNumber, ...dataWithtUnknown];
      console.log(newData);
      setData(newData);
    }
  };
  return (
    <Starwarscontext.Provider
      value={ { data,
        setData,
        dataComplete,
        title,
        filterName,
        setFilterName,
        filterComparison,
        setFilterComparison,
        filterColumn,
        setFilterColumn,
        filterValue,
        setFilterValue,
        order,
        setOrder,
        typeOrder,
        setTypeOrder,
        restoreDataBeforeExclusion,
        filterSave,
        setFilteSave,
        sortDataPopulation,
        sortDataNumeric,
        isFilter,
        setIsFilter,
        columnFilterArrayValues,
        setColumnFilterValue,
        teste,
        setTeste,
      } }
    >
      {children}
    </Starwarscontext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default Provider;
