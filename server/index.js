// Importar el módulo 'socket.io' para la comunicación en tiempo real
const { Server } = require('socket.io');

// Importar el módulo 'http' para crear el servidor HTTP
const http = require('http');

// Crear un servidor HTTP utilizando el módulo 'http'
const serverHttp = http.createServer();

// Configurar socket.io para trabajar con el servidor HTTP creado
const io = new Server(serverHttp, {
    // Configurar el CORS para permitir el acceso desde los siguientes orígenes
    cors: {
        origin: ['http://localhost', 'http://localhost:4200']
    }
});

// Manejar eventos de conexión de socket.io
io.on('connection', (socket) => {
    // Manejar evento de conexión de un cliente
    console.log('connected');

    // Escuchar el evento 'message' enviado por un cliente
    socket.on('message', (data) => {
        // Manejar el mensaje recibido
        console.log(data);

        // Emitir un mensaje a todos los clientes conectados, excepto al cliente que lo envió
        socket.broadcast.emit('received', { data: data, message: 'Esta es una prueba desde el servidor' });
    });
});

// Escuchar en el puerto 4000 y mostrar un mensaje cuando el servidor se inicia correctamente
serverHttp.listen(4000, () => {
    console.log('Servidor de socket.io escuchando en el puerto 4000');
});
