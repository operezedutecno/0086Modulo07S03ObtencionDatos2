const errorFormat = (error) => {
    let response = {}
    switch (error.code) {
        case "42P01": // Caso cuando la tabla a consultar no existe
            response = {
                message: error.message,
                code: error.code,
                event: 'TABLA_NO_EXISTENTE'
            }
        break;

        case "42601": // Caso cuando hay error de sintaxis
            response = {
                message: error.message,
                code: error.code,
                event: 'ERROR_SINTAXIS'
            }
        break;

        case "42703": // Caso cuando alguna columna no existe
            response = {
                message: error.message,
                code: error.code,
                event: 'COLUMNA_NO_EXISTENTE'
            }
        break;

    
        default:
            response = {
                message: error.message,
                code: error.code,
                event: 'ERROR_DESCONOCIDO'
            }
        break;
    }

    return response
}

module.exports = { errorFormat }