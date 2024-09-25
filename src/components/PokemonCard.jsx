import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import StarButton from './StarButton';
import { setFavorite } from '../slices/dataSlice';
import { useDispatch } from 'react-redux';

const PokemonCard = ({id, name, image, types, favorite}) => {

    const dispatch = useDispatch();

    const handleOnFavorite = () => {
        dispatch(setFavorite({pokemonId: id}));
    };

    return (
        <Card title={name} cover={<img src={image} alt={name} />} extra={<StarButton isFavorite={favorite} onClick={() => handleOnFavorite()}/>}>
            <Meta description={types.map(t => (t.type.name)).join(', ')}/>
        </Card>
    )
}

export default PokemonCard