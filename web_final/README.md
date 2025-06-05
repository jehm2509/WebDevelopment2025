Final - Jhon Edison Hurtado

Código creado implementando express con typescript por preferencias personales sobre js directamente. 
Y para evitar copia directamente de el código.

- Se ilmplemento la libreria Zod para validar los relquest, es algo aidcional a lo visto en clase.
- Se utilizo el alias @ para acceder a todas las rutas de la aplicacion y no tener inconsistencias en la importacion.
- Se adjunta colleccion de postman con las API's implementadas en la carpeta docs
- Se debe configurar la conexion en el .env dependiendo de la conexion, en mi caso usa user=root y pass=root, db web_final.

APIS Desarrolladas 

- GET    /                  => Health check
- POST   /ap/user           => Crea un usuario
- POST   /api/login         => Permite hacer login: username: "email@email.com" y pass: "my_pass" la session tiene por defecto una duracion de 5 minutos con fines de pruebas de duración de la session.
- GET    /api/contacts      => Permite listar los contactos
- POST   /api/contact       => Permite crear un contacto
- PATCH  /api/contact       => Permite actualizar un contacto
- DELETE /api/contact/:id   => Permite borrar un contacto

npm run dev

El front esta desarrollado en angular.

ng serve
