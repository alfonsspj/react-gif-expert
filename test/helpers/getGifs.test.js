import { getGifs } from "../../src/helpers/getGifs";

describe('Prueba en getGifs()', () => {

    test('debe de retornar un arreglo de gifs', async() => { 
        const gifs = await getGifs('One Punch');
        // console.log(gifs);
        expect( gifs.length ).toBeGreaterThan( 0 ); // sea mayor a 0 - array de más de un elemento
        expect( gifs[0] ).toEqual({
            id: expect.any( String ),
            title:  expect.any( String ),
            url: expect.any( String ),
        }) 
    });
});