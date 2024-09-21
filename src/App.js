import { useEffect } from 'react';
import { Col, Spin } from 'antd'
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import Logo from './statics/logo.svg'
import { getPokemon } from './api';
import { getPokemonsWithDetails } from './actions';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  // console.log(pokemons)

  // const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonsRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonsRes));
    };
    fetchPokemons();
  }, []);
  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={Logo} alt="Logo" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      <Col offset={12}>
        <Spin spinning size='large'/>
      </Col>
      <PokemonList pokemons={pokemons}/>
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
