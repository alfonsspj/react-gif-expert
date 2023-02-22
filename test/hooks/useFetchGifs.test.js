import { renderHook,  waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";


describe('Prueba en el hook useFetchGifs', () => {
    
    test('debe de regresar el estado inicial', () => { 
        // const { images, isLoading } = useFetchGifs() // no se puede hacer

        const { result } = renderHook( () => useFetchGifs('One Punch') );
        // console.log(result); // { current: { images: [], isLoading: true }}
        const { images, isLoading } = result.current;

        expect( images.length ).toBe(0);// estado inicial -- no hay imagen
        expect( isLoading ).toBeTruthy(); // que se true

    });

    test('debe de retornar un arreglo de imagenes y isLoading en false', async() => {

        const { result } = renderHook( () => useFetchGifs('One Punch') );
        // espera -- expresion para cuando suceda el cambio
        await waitFor(  // espera a que esta condicion se cumpla
            () => expect( result.current.images.length ).toBeGreaterThan(0), // sea mayor a 0

            // {
            //     timeout: 1000 // por default es 1 segundo
            // }
        );

        const { images, isLoading } = result.current;
        expect( images.length ).toBeGreaterThan(0);// mayor que 0 
        expect( isLoading ).toBeFalsy(); // que sea false 

    });
});