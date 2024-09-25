import { useEffect } from 'react';
import { Col, Spin } from 'antd'
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import Logo from './statics/logo.svg'
import { getPokemon } from './api';
import { getPokemonsWithDetails, setLoading } from './actions';
import './App.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

function App() {

  const pokemons = useSelector((state) => state.getIn(['data', 'pokemons']), shallowEqual).toJS();
  const loading = useSelector((state) => state.getIn(['ui', 'loading']));
  const dispatch = useDispatch();
  // console.log(pokemons)

  // const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(setLoading(true));
      const pokemonsRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonsRes));
      dispatch(setLoading(false));
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
