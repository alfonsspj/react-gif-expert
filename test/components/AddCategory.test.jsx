import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe('Pruebas en <AddCategory />', () => { 
    test('debe de cambiar el valor de la caja de texto', () => { 
        render( <AddCategory onNewCategory={ () => {}} /> );

        const input = screen.getByRole( 'textbox'); // extraemos el input

        // para disparar un evento 
        fireEvent.input( input, { target: { value: 'Saitama' }});

        expect( input.value ).toBe('Saitama');

        // screen.debug(); // vamos a ver el (objeto) sujeto de prueba
    });

    test('debe de llamar onNewCategory si el input tiene un valor', () => {
        const inputValue = 'Saitama';
        const onNewCategory = jest.fn(); // un mock es una simulacion (de una funcion )   --- jest function

        // render( <AddCategory onNewCategory={ () => {}} /> );
        render( <AddCategory onNewCategory={ onNewCategory } /> );
        
        // extraer la referencia al input y el form
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        // disparar los eventos respectivos
        fireEvent.input( input, { target: { value: inputValue }});
        fireEvent.submit( form );
        // screen.debug();

        expect( input.value ).toBe('');
        expect( onNewCategory ).toHaveBeenCalled(); // si la funcion ha sido llamada
        expect( onNewCategory ).toHaveBeenCalledTimes(1); // si la funcion ha sido llamada solo una vez
        expect( onNewCategory ).toHaveBeenCalledWith( inputValue ); // la funcion ha sido llamada con el inputValue('Saitama') // con el valor de la caja de texto
    });

    test('no debe de llamar el onNewCategory si el input está vació', () => {
        const onNewCategory = jest.fn();         
        render( <AddCategory onNewCategory={ onNewCategory } /> );

        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect( onNewCategory ).toHaveBeenCalledTimes(0); // haya sido llamado 0 veces
        expect( onNewCategory ).not.toHaveBeenCalled(); // no haya sido llamado

     })
});