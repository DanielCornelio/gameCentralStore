import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import favoritesService from '../../../api/favorites';
import { UserContext } from '../../../contexts/UserContext';

export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const {user, token} = useContext(UserContext)


    const getFavorites = async () => {
        try {
            const data = await favoritesService.getFavoritesByEmail(token);
            setFavorites(data);
        } catch (error) {
            toast.error("Error al cargar los juegos", error)
        }
    }

    useEffect(() => {
        getFavorites();
    }, [])
    
    return (
        <Container>
            Favorites
        </Container>
    )
}
