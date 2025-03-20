Parcial 01 - Jhon Edison Hurtado

Código creado implementando express con typescript por preferencias personales sobre js directamente. 
Y para evitar copia directamente de el código.

- Se ilmplemento la libreria Zod para validar los relquest, es algo aidcional a lo visto en clase.
- Se utilizo el alias @ para acceder a todas las rutas de la aplicacion y no tener inconsistencias en la importacion.
- Se implemento la libreria dotenv para usar variables de entorno, y configurar facilmente el ambiente para cada equipo local.
- Se adjunta colleccion de postman con las API's implementadas

APIS Desarrolladas 

- GET   /                       => Health check
- POST  /ap/create_user         => Crea un usuario, valida que solo permite 2 roles: "administrator" y "general_user"
- POST  /api/login              => Permite hacer login: username: "email@email.com" y pass: "my_pass"
- POST  /api/product            => Permite crear un producto(title,description,price) y solo esta disponible para usuarios administradores logeados
- GET   /api/products           => Permite listar los productos creados, pero requiere estar logeado
- GET   /api/public_products    => Permite listar los productos creados, es publico y no requiere ningun login


npm run dev
