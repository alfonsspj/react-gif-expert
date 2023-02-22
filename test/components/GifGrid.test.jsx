import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs'; // estoy importando la funcion

jest.mock('../../src/hooks/useFetchGifs');// haga un mock del path
// La confusion se genera porque la diferencia es que jest.mock() simula módulos en lugar de una función en especifico, mientras que jest.fn() utiliza una función directamente. Es la única diferencia, con jest.mock() el modulo puede tener multiples funciones


describe('Prueba en <GifGrid />', () => {
    const category = 'One Punch';

    test('debe de mostrar el loading inicialmente', () => { 

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        });

        render( <GifGrid category={ category } /> );
        expect( screen.getByText('Cargando...') );
        expect( screen.getByText( category ) );


    });

    test( 'debe de mostrar items cuando se cargan las imagenes useFetchGifs', () => {

        // data ficticia
        const gifs = [
            {
                id: 'ABC',
                title: 'Saitama',
                url: 'https://localhost/saitama.jpg'
            },
            {
                id: '123',
                title: 'Goku',
                url: 'https://localhost/goku.jpg'
            },
        ]
        
        // suponer que es lo que esta regresando el fetch
        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false
        });

        render( <GifGrid category={ category } /> );
        expect( screen.getAllByRole('img').length ).toBe(2); // todas las imagenes
    }) 
});