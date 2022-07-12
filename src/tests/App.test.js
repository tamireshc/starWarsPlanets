import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Provider from '../context/Provider';
import App from '../App';
import userEvent from '@testing-library/user-event';
import response from './response.js'


describe('Testando se a página de game...', () => { 
  beforeEach(() => {
    jest.restoreAllMocks(); 
  })

test('Testa os inputs e botoes', () => {
  render(
    <Provider>
      <App />
    </Provider>
  );
  const inputSearch = screen.getByTestId("name-filter");
  expect(inputSearch).toBeInTheDocument();
  const inputColumn = screen.getByTestId("column-filter");
  expect(inputColumn ).toBeInTheDocument();
  const inputOperator = screen.getByTestId("comparison-filter");
  expect(inputOperator ).toBeInTheDocument();
  const inputValue = screen.getByTestId("value-filter");
  expect(inputValue ).toBeInTheDocument();
  const button = screen.getByTestId("button-filter");
  expect(button).toBeInTheDocument();
  const buttonRemoveTodosFiltros = screen.getByTestId("button-remove-filters");
  expect(buttonRemoveTodosFiltros).toBeInTheDocument();
  const radioDescendente = screen.getByText(/descendente/i)
  expect(radioDescendente).toBeInTheDocument()
  const radioAscendente = screen.getByText(/ascendente/i)
  expect(radioAscendente).toBeInTheDocument()
  const btnOrdenar = screen.getByRole('button', { name: /ordenar/i })
  expect(btnOrdenar).toBeInTheDocument()

});

test('Testa o cabecalho da tabela', async () => {

  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  })

  render(
    <Provider>
      <App />
    </Provider>
  );
  
  const trName = await screen.findByRole('columnheader', { name: /name/i });
  expect(trName).toBeInTheDocument();
  const trRotation_period = await screen.findByRole('columnheader', { name: /rotation_period/i });
  expect(trRotation_period).toBeInTheDocument();
  const trOrbital_period = await screen.findByRole('columnheader', { name: /orbital_period/i });
  expect(trOrbital_period).toBeInTheDocument();
  const trDiameter = await screen.findByRole('columnheader', { name: /diameter/i });
  expect(trDiameter).toBeInTheDocument();
  const trClimate = await screen.findByRole('columnheader', { name: /Climate/i });
  expect(trClimate).toBeInTheDocument();
  const trGravity = await screen.findByRole('columnheader', { name: /gravity/i });
  expect(trGravity).toBeInTheDocument();
  const trTerrain = await screen.findByRole('columnheader', { name: /terrain/i });
  expect(trTerrain).toBeInTheDocument();
  const trSurface_water = await screen.findByRole('columnheader', { name: /surface_water/i });
  expect(trSurface_water).toBeInTheDocument();
  const trPopulation = await screen.findByRole('columnheader', { name: /population/i });
  expect(trPopulation).toBeInTheDocument();
  const trFilms = await screen.findByRole('columnheader', { name: /films/i });
  expect(trFilms).toBeInTheDocument();
  const trCreated = await screen.findByRole('columnheader', { name: /created/i });
  expect(trCreated).toBeInTheDocument();
  const trEdited = await screen.findByRole('columnheader', { name: /edited/i });
  expect(trEdited).toBeInTheDocument();
  const trUrl = await screen.findByRole('columnheader', { name: /url/i });
  expect(trUrl).toBeInTheDocument();

});

test('Testa o valor inputs', async () => {
  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  })

  render(
    <Provider>
      <App />
    </Provider>
  );
  const inputSearch = screen.getByTestId("name-filter");
  userEvent.type(inputSearch, "oo")
  expect(inputSearch).toHaveValue("oo")
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "55")
  expect(inputValue).toHaveValue(55)
  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, ["diameter"])
  expect(inputColumn).toHaveValue("diameter")
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, ["igual a"])
  expect(inputOperator).toHaveValue("igual a")

});


test('Testa o uso do filtro de nome', async () => {
  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  })

  render(
    <Provider>
      <App />
    </Provider>
  );
 
  
  const inputSearch = screen.getByTestId("name-filter");
  userEvent.type(inputSearch, "oo")

  const tatoo = await screen.findByRole('cell', { name: /tatooine/i } )
  const naboo = await screen.findByRole('cell', { name: /naboo/i })
  const bespin = screen.queryByRole('cell', { name: /bespin/i })

  expect(naboo).toBeInTheDocument()
  expect(tatoo).toBeInTheDocument()
  expect(bespin).not.toBeInTheDocument()
  jest.restoreAllMocks()

});

test('Testa o uso do filtro de polupaçao', async () => {
  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  })

  render(
    <Provider>
      <App />
    </Provider>
  );
  const kamino = await screen.findByRole('cell', { name: /kamino/i })
  const naboo = await screen.findByRole('cell', { name: /naboo/i })

  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, ["diameter"])
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, ["maior que"])
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "15000")
  const button = screen.getByTestId("button-filter");
  expect(inputColumn).toHaveValue("diameter")
  userEvent.click(button)
  
 
  expect(inputValue).toHaveValue(15000)

  waitFor(()=>{
  expect(naboo).not.toBeInTheDocument()
  expect(kamino).toBeInTheDocument()

  }, 1000)
 

});

test('Testa o uso do filtro igual a', async () => {
  const mockFetch = jest.fn()
  .mockReturnValueOnce({
    json: jest.fn().mockResolvedValue(response),
  });
  global.fetch = mockFetch;
  render(
    <Provider>
      <App />
    </Provider>
  );
  
  const tatoo = await screen.findByRole('cell', { name: /tatooine/i }, {},{timeout: 5000})
  const naboo = await screen.findByRole('cell', { name: /naboo/i },{},{timeout: 5000})

  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, ["rotation_period"])
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, ["igual a"])
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "23")
  const button = screen.getByTestId("button-filter");
  userEvent.click(button)
  
  expect(inputValue).toHaveValue(23)

  waitFor(()=>{
  expect(naboo).not.toBeInTheDocument()
  expect(tatoo).toBeInTheDocument()

  })
});

test('Testa o uso do filtro menor que', async () => {
  const mockFetch = jest.fn()
  .mockReturnValueOnce({
    json: jest.fn().mockResolvedValue(response),
  });
  global.fetch = mockFetch;
  render(
    <Provider>
      <App />
    </Provider>
  );
  const naboo = await screen.findByRole('cell', { name: /naboo/i })

  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, ["rotation_period"])
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, ["menor que"])
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "23")
  const button = screen.getByTestId("button-filter");
  userEvent.click(button)
  

  const bespin = await screen.findByRole('cell', { name: /bespin/i }, {},{timeout: 5000})

 
  expect(inputValue).toHaveValue(23)
  expect(bespin).toBeInTheDocument()
  expect(naboo).not.toBeInTheDocument()

});

 test('Testa o salvamento dos filtros na tela', () => {
   const mockFetch = jest.fn()
     .mockReturnValueOnce({
       json: jest.fn().mockResolvedValue(response),
     });
   global.fetch = mockFetch;

   render(
     <Provider>
       <App />
     </Provider>
   );

   const inputColumn = screen.getByTestId("column-filter");
   userEvent.selectOptions(inputColumn, [ "rotation_period" ])
   const inputOperator = screen.getByTestId("comparison-filter");
   userEvent.selectOptions(inputOperator, [ "menor que" ])
   const inputValue = screen.getByTestId("value-filter");
   userEvent.type(inputValue, "23")
   const button = screen.getByTestId("button-filter");
   userEvent.click(button)

   expect(screen.getAllByText(/rotation_period/i)).toHaveLength(2)
   expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument()
 });

 test('Testa o salvamento de dois filtros na tela', async () => {
  jest.spyOn(global, "fetch")
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  })

  render(
    <Provider>
      <App />
    </Provider>
  );

  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, [ "rotation_period" ])
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, [ "menor que" ])
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "23")
  const button = screen.getByTestId("button-filter");
  userEvent.click(button)

  expect(screen.getAllByText(/rotation_period/i)).toHaveLength(2)
  expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument()

  userEvent.selectOptions(inputColumn, [ "orbital_period" ])
  userEvent.selectOptions(inputOperator, [ "maior que" ])
  userEvent.type(inputValue, "405")
  userEvent.click(button)

  const btnExcluir = screen.getAllByRole('button', { name: /excluir/i })

  expect(screen.getAllByText(/orbital_period/i)).toHaveLength(2)
  expect(btnExcluir).toHaveLength(2)
  expect(screen.queryByText(/naboo/i)).not.toBeInTheDocument()

});

 test('Testa a exclusao dos filtros personalizados na tela', async () => {
  const mockFetch = jest.fn()
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(response),
    });
  global.fetch = mockFetch;

  render(
    <Provider>
      <App />
    </Provider>
  );

  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, [ "rotation_period" ])
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, [ "menor que" ])
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "23")
  const button = screen.getByTestId("button-filter");
  userEvent.click(button)

  const btnExcluir = screen.getByRole('button', { name: /excluir/i })

  expect(screen.getAllByText(/rotation_period/i)).toHaveLength(2)
 
  waitFor(()=>{
    const tatoo = screen.queryByRole('cell', { name: /tatooine/i })
    expect(tatoo).not.toBeInTheDocument();
  }, 1000)
  
  userEvent.click(btnExcluir)

 waitFor(()=>{
  const tatoo = screen.queryByRole('cell', { name: /tatooine/i })
  expect(tatoo).toBeInTheDocument();
 })
  
  
});


test('Testa a inclusao e exclusao de multiplos filtros personalizados na tela', async () => {
  const mockFetch = jest.fn()
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(response),
    });
  global.fetch = mockFetch;

  render(
    <Provider>
      <App />
    </Provider>
  );

  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, [ "rotation_period" ])
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, [ "menor que" ])
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "23")
  const button = screen.getByTestId("button-filter");
  userEvent.click(button)

  

  expect(screen.getAllByText(/rotation_period/i)).toHaveLength(2)
 
  waitFor(()=>{
    const tatoo = screen.queryByRole('cell', { name: /tatooine/i })
    expect(tatoo).not.toBeInTheDocument();
  }, 1000)
  
  userEvent.selectOptions(inputColumn, [ "orbital_period" ])
  userEvent.selectOptions(inputOperator, [ "igual a" ])
  userEvent.type(inputValue, "402")
  

 waitFor(()=>{
  const tatoo = screen.queryByRole('cell', { name: /tatooine/i })
  const endor = screen.queryByRole('cell', { name: /endor/i })
  expect(tatoo).not.toBeInTheDocument();
  expect(endor).toBeInTheDocument();
 },1000)

 const btnExcluir = screen.getAllByRole('button', { name: /excluir/i })

 userEvent.click(btnExcluir[0])

 waitFor(()=>{
  const tatoo = screen.queryByRole('cell', { name: /tatooine/i })
  const endor = screen.queryByRole('cell', { name: /endor/i })
  expect(tatoo).not.toBeInTheDocument();
  expect(endor).toBeInTheDocument();
 },1000)

 waitFor(()=>{
  const btnExcluir2 = screen.getByRole('button', { name: /excluir/i })
  userEvent.click(btnExcluir2)
 },1000)

 
 waitFor(()=>{
  const tatoo = screen.queryByRole('cell', { name: /tatooine/i })
  const endor = screen.queryByRole('cell', { name: /endor/i })
  expect(tatoo).toBeInTheDocument();
  expect(endor).toBeInTheDocument();
 },1000)

  
  
});

test('Testa a exclusao de todos os filtros na tela', async () => {
  const mockFetch = jest.fn()
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(response),
    });
  global.fetch = mockFetch;

  render(
    <Provider>
      <App />
    </Provider>
  );

  const inputColumn = screen.getByTestId("column-filter");
  userEvent.selectOptions(inputColumn, [ "rotation_period" ])
  const inputOperator = screen.getByTestId("comparison-filter");
  userEvent.selectOptions(inputOperator, [ "menor que" ])
  const inputValue = screen.getByTestId("value-filter");
  userEvent.type(inputValue, "23")
  const button = screen.getByTestId("button-filter");
  userEvent.click(button)

  const btnExcluirTodosOsFiltros = screen.getByRole('button', { name: /remover todos os filtros/i })

  expect(screen.getAllByText(/rotation_period/i)).toHaveLength(2)

  userEvent.click(btnExcluirTodosOsFiltros)

  const tatoo = await screen.findByRole('cell', { name: /tatooine/i })
  expect(tatoo).toBeInTheDocument();
  
});

test('Testa  a ordenação por populaçao', async () => {
  const mockFetch = jest.fn()
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(response),
    });
  global.fetch = mockFetch;

  render(
    <Provider>
      <App />
    </Provider>
  );

  const inputColumn = screen.getByTestId("column-sort");
  userEvent.selectOptions(inputColumn, [ "population" ])
  const radioAscendente = screen.getByTestId("column-sort-input-asc")
  userEvent.click(radioAscendente)
  const btnOrdenar = screen.getByRole('button', { name: /ordenar/i })
  userEvent.click(btnOrdenar)

  waitFor(()=>{
  const planets = screen.getAllByTestId("planet-name")
  expect(planets[0]).toHaveTextContent(/Yavin IV/i)
  expect(planets[planets.length -1]).toHaveTextContent(/unknown/i)
  expect(planets[planets.length -2]).toHaveTextContent(/unknown/i)
  },1000)

  const radioDescendente = screen.getByTestId("column-sort-input-desc")
  userEvent.click(radioDescendente)
  userEvent.click(btnOrdenar)

  waitFor(()=>{
    const planets = screen.getAllByTestId("planet-name")
    expect(planets[0]).toHaveTextContent(/Coruscant/i)
    expect(planets[planets.length - 1]).toHaveTextContent(/unknown/i)
    },1000)

});

test('Testa a ordenação por surface_water', async () => {
  const mockFetch = jest.fn()
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(response),
    });
  global.fetch = mockFetch;

  render(
    <Provider>
      <App />
    </Provider>
  );

  const inputColumn = screen.getByTestId("column-sort");
  userEvent.selectOptions(inputColumn, [ "surface_water" ])
  const radioAscendente = screen.getByTestId("column-sort-input-asc")
  userEvent.click(radioAscendente)
  const btnOrdenar = screen.getByRole('button', { name: /ordenar/i })
  userEvent.click(btnOrdenar)

  waitFor(()=>{
  const planets = screen.getAllByTestId("planet-name")
  expect(planets[0]).toHaveTextContent(/bespin/i)
  },1000)

  const radioDescendente = screen.getByTestId("column-sort-input-desc")
  userEvent.click(radioDescendente)
  userEvent.click(btnOrdenar)

  waitFor(()=>{
    const planets = screen.getAllByTestId("planet-name")
    expect(planets[0]).toHaveTextContent(/Hoth/i)
    expect(planets[planets.length - 1]).toHaveTextContent(/unknown/i)
    },1000)

});



test('Testa  a ordenação por diametro', async () => {
  const mockFetch = jest.fn()
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(response),
    });
  global.fetch = mockFetch;

  render(
    <Provider>
      <App />
    </Provider>
  );

  const inputColumn = screen.getByTestId("column-sort");
  userEvent.selectOptions(inputColumn, [ "diameter" ])
  const radioAscendente = screen.getByTestId("column-sort-input-asc")
  userEvent.click(radioAscendente)
  const btnOrdenar = screen.getByRole('button', { name: /ordenar/i })
  userEvent.click(btnOrdenar)

  waitFor(()=>{
  const planets = screen.getAllByTestId("planet-name")
  expect(planets[0]).toHaveTextContent(/Endor/i)
  },1000)

  const radioDescendente = screen.getByTestId("column-sort-input-desc")
  userEvent.click(radioDescendente)
  userEvent.click(btnOrdenar)

  waitFor(()=>{
    const planets = screen.getAllByTestId("planet-name")
    expect(planets[0]).toHaveTextContent(/Bespin/i)
    },1000)

});

// test('Testa o uso dos filtros', () => {
//   render(
//     <Provider>
//       <App />
//     </Provider>
//   );
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('Testa os inputs', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });
})