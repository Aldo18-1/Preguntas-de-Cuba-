// Cargar el archivo JSON con las preguntas
fetch('preguntas.json')
  .then(response => response.json())
  .then(preguntas => {
    let preguntaIndex = 0;

    function mostrarPregunta(index) {
      const pregunta = preguntas[index];
      const content = document.getElementById('content');
      content.innerHTML = `
        <h2>Pregunta ${index + 1}</h2>
        <p>${pregunta.pregunta}</p>
        <ul>
          ${pregunta.opciones.map(opcion => 
            `<li><button onclick="verificarRespuesta('${opcion}', '${pregunta.respuesta_correcta}', ${index})">${opcion}</button></li>`
          ).join('')}
        </ul>
      `;
    }

    // Verificar la respuesta seleccionada
    function verificarRespuesta(opcionSeleccionada, respuestaCorrecta, index) {
      const content = document.getElementById('content');
      if (opcionSeleccionada === respuestaCorrecta) {
        content.innerHTML = `<p>¡Correcto! La respuesta correcta es: ${respuestaCorrecta}</p>`;
      } else {
        content.innerHTML = `<p>Incorrecto. La respuesta correcta es: ${respuestaCorrecta}</p>`;
      }

      // Mostrar la siguiente pregunta
      if (index + 1 < preguntas.length) {
        setTimeout(() => mostrarPregunta(index + 1), 2000);
      } else {
        setTimeout(() => content.innerHTML = '<p>¡Juego Terminado!</p>', 2000);
      }
    }

    // Comenzar el juego mostrando la primera pregunta
    mostrarPregunta(preguntaIndex);
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));