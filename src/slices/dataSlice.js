import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
    pokemons: [],
}

export const fetchPokemonWithDetails = createAsyncThunk('data/fetchPokemonWithDetails',
    async (_, {dispatch}) => {
        // dispatch del loader
        //fetch
        // dispatch del loader
        dispatch(setLoading(true));
        const pokemonsRes = await getPokemon();
        const pokemonDetailed = await Promise.all(pokemonsRes.map(pokemon => getPokemonDetails(pokemon)));
        dispatch(setPokemons(pokemonDetailed));
        dispatch(setLoading(false));
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => pokemon.id === action.payload.pokemonId);
            if (currentPokemonIndex >= 0) {
                const isFavorite = state.pokemons[currentPokemonIndex].favorite;
                state.pokemons[currentPokemonIndex].favorite = !isFavorite;
            }
        }
    },
});

export const { setPokemons, setFavorite } = dataSlice.actions;

export default dataSlice.reducer;