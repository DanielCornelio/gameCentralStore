import React, { useContext, useEffect, useState } from 'react'
import { Container, Stack, Alert, Button } from 'react-bootstrap'
import { UserContext } from '../../../contexts/UserContext';
import { GameCard, SectionTitle } from '../../../components';
import { FavoriteContext } from '../../../contexts/FavoriteContext';
import { FavoriteGameCard } from '../../../components/web/FavoriteGameCard';

export const Favorites = () => {
    const { listFavorites, getFavorites } = useContext(FavoriteContext);
    const { user, token } = useContext(UserContext);
const [refreshKey, setRefreshKey] = useState(0); // Key para forzar rerender

    // Recargar favoritos cuando el componente se monte o cuando refreshKey cambie
    useEffect(() => {
        if (user && token) {
            getFavorites();
        }
    }, [user, token, refreshKey]);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1); // Forzar recarga
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

    return (
        <Container>
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
                        />
                    ))}
                </Stack>
            )}
        </Container>
    );
}