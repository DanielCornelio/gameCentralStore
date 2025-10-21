import React, { useContext, useEffect, useState } from 'react'
import { Container, Stack, Alert, Button } from 'react-bootstrap'
import { UserContext } from '../../../contexts/UserContext';
import { GameCard, SectionTitle } from '../../../components';
import { FavoriteContext } from '../../../contexts/FavoriteContext';
import { FavoriteGameCard } from '../../../components/web/FavoriteGameCard';
import { Toaster } from 'react-hot-toast';

export const Favorites = () => {
    const { listFavorites, setListFavorite, getFavorites, removeFavorites} = useContext(FavoriteContext);
    const { user, token } = useContext(UserContext);

    

    const loadFavorites = async() =>{
         if (user && token) {
            try {
                await getFavorites();
            } catch (error) {
                console.error("Error loading favorites:", error);
            }
        }
    }

    const handleFavoriteRemoved = async () => {
        await loadFavorites(); 
        // Recargar la lista después de eliminar
    };

    if (!user) {
        return (
            <Container>
                <Alert variant="warning">
                    Debes iniciar sesión para ver tus favoritos.
                </Alert>
            </Container>
        );
    }

    // Recargar favoritos cuando el componente se monte o cuando refreshKey cambie
    useEffect(() => {
        if (user && token) {
            loadFavorites();
        }
    }, [user, token]);

    return (
        <Container>
             <Toaster position="top-right" reverseOrder={true} /> 
            <SectionTitle title='Tus Juegos Favoritos'/>

            {listFavorites.length === 0 ? (
                <Alert variant="info">
                    No tienes juegos favoritos aún.
                </Alert>
            ) : (
                <Stack direction='horizontal' gap={4} className="flex-wrap">
                    {listFavorites.map(favorito => (
                        <FavoriteGameCard 
                            key={favorito.id} 
                            {...favorito} 
                            onFavoriteRemoved={handleFavoriteRemoved} 
                        />
                    ))}
                </Stack>
            )}
        </Container>
    );
}