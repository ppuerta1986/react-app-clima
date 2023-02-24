import React, { Fragment, useState, useEffect } from 'react'
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';
function App() {

  const [ busqueda, guardarBusqueda ] = useState({
    ciudad:'',
    pais: ''
  });
  const [consulta, guardaConsultar ] = useState(false)
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false)
  const {ciudad, pais } = busqueda;

  useEffect(()=>{

    const consultarApi = async () => {

      if(consulta) {
        const appId = '5695a2d1578488ca9d4617b95a3b6dc6';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardaConsultar(false);

          // detecta  si los resultados son correctos

        if(resultado.cod === '404') {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    consultarApi();

    // eslint-disable-next-line
  }, [consulta]);

  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultado"/>
  } else {
    componente = <Clima resultado={resultado} />
  }


  return (
    <Fragment>
      <Header
      titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
            <div className="row">
                <div className="col m6 s12">
                  <Formulario 
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardaConsultar={guardaConsultar}
                  />
                </div>
                <div className="col m6 s12">
                  {componente} 
                </div>
            </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
