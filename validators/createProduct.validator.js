



module.exports = {
  name: {
    exists: true,
    errorMessage: 'El campo nombre es requerido',
    isLength: {
      options: { min: 3 },
      errorMessage: 'El campo nombre necesita un mínimo de 3 caracteres'

    }
  },
  available: {
    isBoolean: true,
    errorMessage: 'El campo disponibilidad debe ser true/false',
    custom: {
      options: (value) => value,
      errorMessage: 'Todas las insercciones deben estar disponibles'
    }
  }

}