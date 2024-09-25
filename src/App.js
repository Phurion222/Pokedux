import { useEffect } from 'react';
import { Col, Spin } from 'antd'
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import Logo from './statics/logo.svg'
import './App.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchPokemonWithDetails } from './slices/dataSlice';

function App() {

  const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();
  // console.log(pokemons)

  // const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    dispatch(fetchPokemonWithDetails());
  }, []);
  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={Logo} alt="Logo" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? 
        (<Col offset={12}>
          <Spin spinning size='large'/>
        </Col>): 
        (<PokemonList pokemons={pokemons}/>)
      }
      
    </div>
  );
}

// const mapStateToProps = (state => ({
//   pokemons: state.pokemons,
// }));

// const mapDispatchToProps = (dispatch) => ({
//   setPokemons: (value) => dispatch(setPokemonsAction(value))
// });

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
