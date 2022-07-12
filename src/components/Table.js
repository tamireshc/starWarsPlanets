import React, { useContext } from 'react';
import Starwarscontext from '../context/StarwarsContext';

function Table() {
  const { data, title, filterName, setFilterName, filterComparison, setFilterComparison,
    filterColumn, setFilterColumn, filterValue, dataComplete, setFilterValue,
    setData, typeOrder, setTypeOrder, filterSave, setFilteSave,
    sortDataPopulation, order, setOrder, sortDataNumeric, isFilter, setIsFilter,
    columnFilterArrayValues, setColumnFilterValue, teste, setTeste,
    restoreDataBeforeExclusion } = useContext(Starwarscontext);

  const filterData = () => {
    const retorno = data?.filter((item) => item.name.includes(filterName))
      .filter((item) => {
        switch (filterComparison) {
        case 'maior que':
          return item[filterColumn] > +filterValue;
        case 'menor que':
          return item[filterColumn] < +filterValue;
        default:
          return item[filterColumn] === filterValue;
        }
      });
    setData(retorno);
  };

  const removeFilter = (filter) => {
    const newCollum = columnFilterArrayValues.filter((item) => item !== filter);
    setColumnFilterValue(newCollum);
    setFilterColumn(newCollum[0]);
  };

  const saveFilter = () => {
    setFilteSave([...filterSave,
      [filterColumn, ' ', filterComparison, ' ', filterValue]]);
  };

  return (
    <section>
      <div className="options-container">
        <div className="input-name-container">
          <input
            type="text"
            data-testid="name-filter"
            value={ filterName }
            placeholder="Busque pelo Planeta"
            onChange={ (event) => setFilterName(event.target.value) }
          />
        </div>

        <div className="options-container-inner">

          <label htmlFor="coluna">
            Coluna
            <select
              id="coluna"
              data-testid="column-filter"
              value={ filterColumn }
              onChange={ (event) => {
                setFilterColumn(event.target.value);
              } }
            >
              { columnFilterArrayValues.map((item) => {
                if (item === 'diameter') {
                  return (
                    <option
                      key={ item }
                      value={ item }
                      selected
                    >
                      { item }
                    </option>
                  );
                }
                return (
                  <option
                    key={ item }
                    value={ item }
                  >
                    { item }
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="operador">
            Operador
            <select
              id="operador"
              data-testid="comparison-filter"
              value={ filterComparison }
              onChange={ (event) => {
                setFilterComparison(event.target.value);
              } }
            >
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>
            </select>
          </label>
          <label>
            {' '}
            Valor
            <input
              type="number"
              data-testid="value-filter"
              value={ filterValue }
              onChange={ (event) => {
                setFilterValue(event.target.value);
              } }
            />
          </label>
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => {
              filterData();
              setIsFilter(true);
              removeFilter(filterColumn);
              saveFilter();
            } }
          >
            Filtrar
          </button>

          {filterSave?.map((item) => (
            <div key={ item } className="excluir-filter" data-testid="filter">
              <p>
                { item }
              </p>
              <button
                type="button"
                onClick={ () => {
                  setColumnFilterValue([...columnFilterArrayValues, item[0]]);
                  setFilterColumn(columnFilterArrayValues[0]);
                  restoreDataBeforeExclusion(item);
                } }
              >
                Excluir
              </button>

            </div>
          ))}
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => setData(dataComplete) }
          >
            Remover todos os filtros
          </button>

        </div>
        <div className="container-input-order">
          <label htmlFor="coluna">
            Ordenar por:
            <select
              id="coluna"
              data-testid="column-sort"
              value={ order }
              onChange={ (event) => {
                setOrder(event.target.value);
              } }
            >
              {['population', 'orbital_period', 'diameter', 'rotation_period',
                'surface_water']
                .map((item) => (
                  <option
                    key={ item }
                    value={ item }
                  >
                    { item }
                  </option>))}
            </select>
          </label>

          <div className="asc-desc">
            <div>
              <label htmlFor="ascendente" className="label-input-order">
                Ascendente

                <input
                  data-testid="column-sort-input-asc"
                  type="radio"
                  id="ascendente"
                  name="radio-order"
                  value={ typeOrder }
                  onClick={ () => setTypeOrder('ASC') }
                />
              </label>
            </div>
            <div>
              <label htmlFor="descendente" className="label-input-order">
                Descendente
              
              <input
                data-testid="column-sort-input-desc"
                type="radio"
                id="descendente"
                name="radio-order"
                value={ typeOrder }
                onClick={ () => {
                  setTypeOrder('DESC');
                } }
              />
              </label>
            </div>

          </div>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => {
              if (order === ('population') || order === ('surface_water')) {
                sortDataPopulation();
                setTeste(!teste);
              } else {
                sortDataNumeric();
                setTeste(!teste);
              }
            } }
          >
            Ordenar
          </button>
          {teste ? '' : ''}
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {title?.map((item) => <th key={ item }>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {!isFilter && data?.filter((item) => item.name.includes(filterName))
              .map((item) => (
                <tr key={ item.name }>
                  <td data-testid="planet-name">{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.residents}</td>
                  <td>{item.films}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>))}
            {isFilter && data.map((item) => (
              <tr key={ item.name }>
                <td data-testid="planet-name">{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.residents}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Table;
