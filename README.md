# PROYECTO UNITICKET
La finalidad de este proyecto es ayudar a nuestra institucion "Univalle" al control y seguimiento de los diferentes eventos que se realizan en la universidad, para esto fue creada la app UNITICKET ya que esta controla la creacion de diferentes eventos con fechas, horas y tipos de audiencia, tambien controla las asistencia de los diferentes estudiantes y docentes a los distintos eventos que son asignados para asi poder tener el control y saber quienes asistieron.


Este proyecto fue desarrollado con REACT NATIVE en el editor de codigo VISUAL ESTUDIO CODE, para este proyecto la base de datos fue estructurada en MYSQL y para la parte MOVIL se uso la aplicacion "Expo" ya que facilita la vista previa en movil en tiempo real.

Este proyecto tiene como estructura 3 roles:
- ADMINISTRADOR
- USUARIO (ESTUDIANTE O DOCENTE)
- SECRETARIA

## PROCESO DE INSTALACION 

Como primer paso tenemos que ingresar desde la base de datos los estudiantes que se requiera para asi poder asignarles un evento al cual puedan asistir.

### Ticket_Proyectoslll-mainNUEVO 1\Ticket_Proyectoslll-main\ticket_prj
Dentro de la ruta realizamos el siguiente comando.
```bash
npm install
```
Dentro de la carpeta backend modificar el archivo mysql.js con tu conexion.
 ```bash
 const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Univalle',
  database: 'ticket_db',
});
 ```
 Para la parte del backend abrir otra terminal y ejecutar en la ruta 
 Ticket_Proyectoslll-mainNUEVO 1\Ticket_Proyectoslll-main\ticket_prj\backend
 ```bash
 node mysql.js
 ```

# Para Iniciar la aplicacion 
Debemos de revisar las configuraciones de direcciones IP de las diferentes carpetas del proyecto donde se usan y esta direccion tiene que ser la misma direccion de la red de celular 
```bash
onst handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.12:3000/login', {
        university_code: universityCode,
        university_password: universityPassword,
       
      });
```

Por ultimo iniciamos la aplicacion con este comando.
```bash
npm start
```
Nos saldra un codigo qr el cual lo escaneamos con el dispositivo movil.
