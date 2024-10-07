// Variables globales
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }];
let direction = 'right';
let nextDirection = 'right';
let food = {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10
};
let score = 0;
let maxScore = 0; // Inicializa el puntaje máximo
let velocidad = 100;
const unitSize = 10; // Tamaño de cada unidad de la serpiente y la comida
let isPaused = false; // Variable para controlar el estado de pausa

// Función principal
function draw() {
    if (!isPaused) { // Solo dibuja si no está en pausa
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibuja la serpiente
        snake.forEach((part, index) => {
            ctx.fillStyle = index === 0 ? 'green' : 'lime';
            ctx.fillRect(part.x, part.y, unitSize, unitSize);
        });

        // Dibuja la comida
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, unitSize, unitSize);

        // Actualiza la dirección
        direction = nextDirection;
        switch (direction) {
            case 'right':
                snake[0].x += unitSize;
                break;
            case 'left':
                snake[0].x -= unitSize;
                break;
            case 'up':
                snake[0].y -= unitSize;
                break;
            case 'down':
                snake[0].y += unitSize;
                break;
        }

        // Verifica colisiones con bordes
        if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
            return gameOver();
        }

        // Verifica si come la comida
if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    food = {
        x: Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize,
        y: Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize
    };
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });  // Añade nueva parte

    // Nota: El puntaje máximo ya no se actualiza aquí, solo al final del juego
}

        // Verifica si se come a sí misma
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return gameOver();
            }
        }

        // Actualiza la serpiente (mueve la cola hacia adelante)
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }

        // Muestra el puntaje actual y el máximo
        document.getElementById('currentScore').textContent = score; // Muestra el puntaje actual
        document.getElementById('maxScore').textContent = maxScore; // Muestra el puntaje máximo
    }

    // Llama a la función draw cada 100ms
    setTimeout(draw, velocidad);
}

// Manejo del teclado
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            break;
    }
});

// Manejo del botón de pausa
document.getElementById('pauseButton').addEventListener('click', () => {
    isPaused = !isPaused; // Cambia el estado de pausa
    document.getElementById('pauseButton').textContent = isPaused ? 'Reanudar' : 'Pausar'; // Cambia el texto del botón
});

// Función para terminar el juego
function gameOver() {
    if (score > maxScore) {
        maxScore = score; // Actualiza el puntaje máximo
        alert(`¡Felicidades! Has superado el puntaje máximo anterior. Puntaje final: ${score}`);
    } else {
        alert(`Juego terminado. Puntaje final: ${score}`);
    }
    resetGame(); // Reinicia el juego
}

// Función para reiniciar el juego
function resetGame() {
    snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }];
    direction = 'right';
    nextDirection = 'right';
    food = {
        x: Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize,
        y: Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize
    };
    score = 0; // Reinicia el puntaje actual
    draw(); // Reinicia el ciclo del juego
}

// Inicia el juego
draw();
