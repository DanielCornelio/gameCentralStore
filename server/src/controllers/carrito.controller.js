export const getGame = async (req, res) => {
    try {
        const {id} = req.params
        const juego = await getGameByIdModel(id);
        res.status(200).json({result:juego})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
