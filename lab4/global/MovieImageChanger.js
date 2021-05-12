export const MovieImageChanger = (key) => {
    switch (key) {
        case 'Poster_01.jpg':
            return require('../assets/posters/Poster_01.jpg')
        case 'Poster_02.jpg':
            return require('../assets/posters/Poster_02.jpg')
        case 'Poster_03.jpg':
            return require('../assets/posters/Poster_03.jpg')
        case 'Poster_05.jpg':
            return require('../assets/posters/Poster_05.jpg')
        case 'Poster_06.jpg':
            return require('../assets/posters/Poster_06.jpg')
        case 'Poster_07.jpg':
            return require('../assets/posters/Poster_07.jpg')
        case 'Poster_08.jpg':
            return require('../assets/posters/Poster_08.jpg')
        case 'Poster_10.jpg':
            return require('../assets/posters/Poster_10.jpg')
            

        default:
            return require('../assets/posters/no-poster.jpg')
    }
}
